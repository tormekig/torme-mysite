import React from 'react';

export function InfoTable({ compartmentCode, square }: { compartmentCode: string, square: string }) {

	return (
		<table>
			<tbody>
				<tr>
					<td>番号区画コード</td>
					<td>{compartmentCode}</td>
				</tr>
				<tr>
					<td>方形区画</td>
					<td>{square}</td>
				</tr>
			</tbody>
		</table>
	)
}