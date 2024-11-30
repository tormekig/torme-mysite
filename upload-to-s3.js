const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const AWS = require('aws-sdk')

const s3 = new AWS.S3()
const BUCKET_NAME = 'torme-mysite-bucket'
const longSideLength = 512

const syncDir = path.join(__dirname, 'public', 'sync')
const thumbDir = path.join(__dirname, 'public', 'sync', 'thumb')

const resizeImage = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath).rotate().resize(longSideLength).toFile(outputPath)
    console.log(`Image resized: ${inputPath}`)
  } catch (error) {
    console.error(`Error resizing image: ${inputPath}`, error)
  }
}

const uploadToS3 = async (filePath, s3Key) => {
  try {
    const fileContent = fs.readFileSync(filePath)

    const normalizedKey = s3Key.replace(/\\/g, '/') // Windowsの\を/に変換

    const params = {
      Bucket: BUCKET_NAME,
      Key: normalizedKey,
      Body: fileContent,
      ContentType: 'image/jpeg',
    }

    const data = await s3.upload(params).promise()
    console.log(`File uploaded successfully: ${data.Location}`)
  } catch (error) {
    console.error(`Error uploading file to S3: ${filePath}`, error)
  }
}

const processImages = async (dirPath) => {
  const files = fs.readdirSync(dirPath)

  for (const file of files) {
    const fullPath = path.join(dirPath, file)

    if (fullPath.includes('thumb')) {
      continue
    }

    if (fs.statSync(fullPath).isDirectory()) {
      await processImages(fullPath)
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      const relativePath = path.relative(syncDir, fullPath).replace(/\\/g, '/') // Windowsの\を/に変換
      const s3KeyOriginal = `sync/${relativePath}`
      const s3KeyThumb = `sync/thumb/${relativePath}`

      const outputFilePath = path.join(thumbDir, relativePath)
      const thumbDirPath = path.dirname(outputFilePath)
      fs.mkdirSync(thumbDirPath, { recursive: true })

      await resizeImage(fullPath, outputFilePath)
      await uploadToS3(fullPath, s3KeyOriginal)
      await uploadToS3(outputFilePath, s3KeyThumb)
    }
  }
}

// メイン処理
const main = async () => {
  try {
    console.log('Starting image processing...')
    await processImages(syncDir)
    console.log('Image processing completed.')
  } catch (error) {
    console.error('Error during image processing:', error)
  }
}

main()
