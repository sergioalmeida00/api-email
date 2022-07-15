import { Statement } from "../infra/entities/Statement"

export type ICreateStatementDTO =
Pick<
  Statement,
  'user_id' |
  'description' |
  'amount' |
  'type'
>
