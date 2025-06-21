// TypeScript type test for micro-strptime.js
type _Assert<T extends true> = T;
import { strptime } from '../lib/micro-strptime.js';

// 基本的な型チェック
const d1: Date = strptime('2020-01-01', '%Y-%m-%d');

// 型エラー: 引数不足
// @ts-expect-error
strptime('2020-01-01');

// 型エラー: 第2引数の型違い
// @ts-expect-error
strptime('2020-01-01', 123);

// strptime.fd, strptime.B の型チェック
strptime.fd['X'] = ['[0-9]+', function (this: Date, m: string) { this.setUTCFullYear(+m); }];
const n: number = strptime.B['Jan'];

// fd の型エラー: 配列長不足
// @ts-expect-error
strptime.fd['Y'] = ['[0-9]{4}'];
