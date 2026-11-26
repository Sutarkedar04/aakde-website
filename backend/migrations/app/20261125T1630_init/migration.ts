#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/e39db9dc1d7fc04f01d8b223d01d2795d9a9f24b9b0442aa76c54645c44c8b42/contract';
import endContract from '../../snapshots/e39db9dc1d7fc04f01d8b223d01d2795d9a9f24b9b0442aa76c54645c44c8b42/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  col,
  fn,
  lit,
  primaryKey,
  sql,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createNativeEnumType({
        schema: 'public',
        typeName: 'AttemptStatus',
        members: ['IN_PROGRESS', 'SUBMITTED', 'EXPIRED'],
      }),
      this.createNativeEnumType({
        schema: 'public',
        typeName: 'Difficulty',
        members: ['EASY', 'MEDIUM', 'HARD'],
      }),
      this.createNativeEnumType({
        schema: 'public',
        typeName: 'MessageStatus',
        members: ['NEW', 'READ', 'REPLIED'],
      }),
      this.createNativeEnumType({
        schema: 'public',
        typeName: 'OrderStatus',
        members: ['CREATED', 'PAID', 'FAILED', 'REFUNDED'],
      }),
      this.createNativeEnumType({
        schema: 'public',
        typeName: 'PublishStatus',
        members: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
      }),
      this.createNativeEnumType({
        schema: 'public',
        typeName: 'QuestionStatus',
        members: ['DRAFT', 'REVIEWED', 'PUBLISHED', 'RETIRED'],
      }),
      this.createNativeEnumType({
        schema: 'public',
        typeName: 'QuestionType',
        members: ['SINGLE_CHOICE', 'MULTIPLE_SELECT', 'NUMERICAL'],
      }),
      this.createNativeEnumType({
        schema: 'public',
        typeName: 'Role',
        members: ['STUDENT', 'STAFF', 'ADMIN'],
      }),
      this.createNativeEnumType({
        schema: 'public',
        typeName: 'TestAccess',
        members: ['FREE_DEMO', 'PAID'],
      }),
      this.createNativeEnumType({
        schema: 'public',
        typeName: 'TokenType',
        members: ['EMAIL_VERIFY', 'PASSWORD_RESET'],
      }),
      this.createNativeEnumType({
        schema: 'public',
        typeName: 'UserStatus',
        members: ['ACTIVE', 'SUSPENDED'],
      }),
      this.createTable({
        schema: 'public',
        table: 'Attempt',
        columns: [
          col('correctCount', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('demoExamId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('expiresAt', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
          col('guestId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('maxScore', 'numeric(8,3)', {
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 8, scale: 3 } },
          }),
          col('orderId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('score', 'numeric(8,3)', {
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 8, scale: 3 } },
          }),
          col('skippedCount', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('startedAt', 'timestamp(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
          col('status', '"AttemptStatus"', {
            notNull: true,
            default: lit('IN_PROGRESS'),
            codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'AttemptStatus' } },
          }),
          col('submittedAt', 'timestamp(3)', {
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
          col('testId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('wrongCount', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'AttemptItem',
        columns: [
          col('attemptId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('isCorrect', 'bool', { codecRef: { codecId: 'pg/bool@1' } }),
          col('markedForReview', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('marks', 'numeric(6,3)', {
            notNull: true,
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 6, scale: 3 } },
          }),
          col('marksAwarded', 'numeric(8,3)', {
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 8, scale: 3 } },
          }),
          col('negativeMarks', 'numeric(8,6)', {
            notNull: true,
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 8, scale: 6 } },
          }),
          col('numericAnswer', 'numeric(18,6)', {
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 18, scale: 6 } },
          }),
          col('position', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('questionId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('selectedOptionIds', 'text[]', { codecRef: { codecId: 'pg/text@1', many: true } }),
          col('snapshot', 'jsonb', { notNull: true, codecRef: { codecId: 'pg/jsonb@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'ContactMessage',
        columns: [
          col('createdAt', 'timestamp(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('message', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('phone', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('status', '"MessageStatus"', {
            notNull: true,
            default: lit('NEW'),
            codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'MessageStatus' } },
          }),
          col('subject', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Exam',
        columns: [
          col('createdAt', 'timestamp(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
          col('guide', 'jsonb', { codecRef: { codecId: 'pg/jsonb@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('sortOrder', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('status', '"PublishStatus"', {
            notNull: true,
            default: lit('DRAFT'),
            codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'PublishStatus' } },
          }),
          col('updatedAt', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Order',
        columns: [
          col('amountInPaise', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('createdAt', 'timestamp(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
          col('currency', 'text', {
            notNull: true,
            default: lit('INR'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('paidAt', 'timestamp(3)', {
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
          col('provider', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('providerOrderId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('providerPaymentId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('refundedAt', 'timestamp(3)', {
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
          col('status', '"OrderStatus"', {
            notNull: true,
            default: lit('CREATED'),
            codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'OrderStatus' } },
          }),
          col('testId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('usableUntil', 'timestamp(3)', {
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'PaymentEvent',
        columns: [
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('payload', 'jsonb', { notNull: true, codecRef: { codecId: 'pg/jsonb@1' } }),
          col('processedAt', 'timestamp(3)', {
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
          col('provider', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('providerEventId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('receivedAt', 'timestamp(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
          col('type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Question',
        columns: [
          col('createdAt', 'timestamp(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
          col('difficulty', '"Difficulty"', {
            notNull: true,
            default: lit('MEDIUM'),
            codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'Difficulty' } },
          }),
          col('explanation', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('numericAnswer', 'numeric(18,6)', {
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 18, scale: 6 } },
          }),
          col('numericTolerance', 'numeric(18,6)', {
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 18, scale: 6 } },
          }),
          col('status', '"QuestionStatus"', {
            notNull: true,
            default: lit('DRAFT'),
            codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'QuestionStatus' } },
          }),
          col('text', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('topicId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('type', '"QuestionType"', {
            notNull: true,
            default: lit('SINGLE_CHOICE'),
            codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'QuestionType' } },
          }),
          col('updatedAt', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'QuestionOption',
        columns: [
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('isCorrect', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('position', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('questionId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('text', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Session',
        columns: [
          col('createdAt', 'timestamp(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
          col('expiresAt', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('tokenHash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userAgent', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'SiteContent',
        columns: [
          col('key', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
          col('value', 'jsonb', { notNull: true, codecRef: { codecId: 'pg/jsonb@1' } }),
        ],
        constraints: [primaryKey(['key'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Test',
        columns: [
          col('access', '"TestAccess"', {
            notNull: true,
            default: lit('PAID'),
            codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'TestAccess' } },
          }),
          col('createdAt', 'timestamp(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
          col('currency', 'text', {
            notNull: true,
            default: lit('INR'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('durationMinutes', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('examId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('instructions', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('priceInPaise', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('slug', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('status', '"PublishStatus"', {
            notNull: true,
            default: lit('DRAFT'),
            codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'PublishStatus' } },
          }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'TestQuestion',
        columns: [
          col('marks', 'numeric(6,3)', {
            notNull: true,
            default: lit('1.000'),
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 6, scale: 3 } },
          }),
          col('negativeMarks', 'numeric(8,6)', {
            notNull: true,
            default: lit('0.000000'),
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 8, scale: 6 } },
          }),
          col('position', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('questionId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('testId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['testId', 'questionId'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Topic',
        columns: [
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('parentId', 'text', { codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'User',
        columns: [
          col('createdAt', 'timestamp(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('emailVerifiedAt', 'timestamp(3)', {
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('passwordHash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('phone', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('role', '"Role"', {
            notNull: true,
            default: lit('STUDENT'),
            codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'Role' } },
          }),
          col('status', '"UserStatus"', {
            notNull: true,
            default: lit('ACTIVE'),
            codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'UserStatus' } },
          }),
          col('updatedAt', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'VerificationToken',
        columns: [
          col('createdAt', 'timestamp(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
          col('expiresAt', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('tokenHash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('type', '"TokenType"', {
            notNull: true,
            codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'TokenType' } },
          }),
          col('usedAt', 'timestamp(3)', {
            codecRef: { codecId: 'pg/timestamp-string@1', typeParams: { precision: 3 } },
          }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Attempt',
        index: 'Attempt_guestId_demoExamId_key',
        columns: ['guestId', 'demoExamId'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'Attempt',
        index: 'Attempt_orderId_key',
        columns: ['orderId'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'Attempt',
        index: 'Attempt_testId_idx',
        columns: ['testId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Attempt',
        index: 'Attempt_userId_demoExamId_key',
        columns: ['userId', 'demoExamId'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'Attempt',
        index: 'Attempt_userId_startedAt_idx',
        columns: ['userId', 'startedAt'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'AttemptItem',
        index: 'AttemptItem_attemptId_position_key',
        columns: ['attemptId', 'position'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'Exam',
        index: 'Exam_slug_key',
        columns: ['slug'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'Order',
        index: 'Order_providerOrderId_key',
        columns: ['providerOrderId'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'Order',
        index: 'Order_providerPaymentId_key',
        columns: ['providerPaymentId'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'Order',
        index: 'Order_userId_status_idx',
        columns: ['userId', 'status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'PaymentEvent',
        index: 'PaymentEvent_provider_providerEventId_key',
        columns: ['provider', 'providerEventId'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'Question',
        index: 'Question_topicId_status_idx',
        columns: ['topicId', 'status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'QuestionOption',
        index: 'QuestionOption_questionId_position_key',
        columns: ['questionId', 'position'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'Session',
        index: 'Session_tokenHash_key',
        columns: ['tokenHash'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'Session',
        index: 'Session_userId_idx',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Test',
        index: 'Test_examId_status_idx',
        columns: ['examId', 'status'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Test',
        index: 'Test_slug_key',
        columns: ['slug'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'TestQuestion',
        index: 'TestQuestion_testId_position_key',
        columns: ['testId', 'position'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'Topic',
        index: 'Topic_parentId_idx',
        columns: ['parentId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'User',
        index: 'User_email_key',
        columns: ['email'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'VerificationToken',
        index: 'VerificationToken_tokenHash_key',
        columns: ['tokenHash'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'VerificationToken',
        index: 'VerificationToken_userId_type_idx',
        columns: ['userId', 'type'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Attempt',
        foreignKey: {
          name: 'Attempt_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
          onDelete: 'setNull',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Attempt',
        foreignKey: {
          name: 'Attempt_testId_fkey',
          columns: ['testId'],
          references: { schema: 'public', table: 'Test', columns: ['id'] },
          onDelete: 'restrict',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Attempt',
        foreignKey: {
          name: 'Attempt_orderId_fkey',
          columns: ['orderId'],
          references: { schema: 'public', table: 'Order', columns: ['id'] },
          onDelete: 'setNull',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'AttemptItem',
        foreignKey: {
          name: 'AttemptItem_attemptId_fkey',
          columns: ['attemptId'],
          references: { schema: 'public', table: 'Attempt', columns: ['id'] },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'AttemptItem',
        foreignKey: {
          name: 'AttemptItem_questionId_fkey',
          columns: ['questionId'],
          references: { schema: 'public', table: 'Question', columns: ['id'] },
          onDelete: 'restrict',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Order',
        foreignKey: {
          name: 'Order_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
          onDelete: 'restrict',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Order',
        foreignKey: {
          name: 'Order_testId_fkey',
          columns: ['testId'],
          references: { schema: 'public', table: 'Test', columns: ['id'] },
          onDelete: 'restrict',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Question',
        foreignKey: {
          name: 'Question_topicId_fkey',
          columns: ['topicId'],
          references: { schema: 'public', table: 'Topic', columns: ['id'] },
          onDelete: 'restrict',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'QuestionOption',
        foreignKey: {
          name: 'QuestionOption_questionId_fkey',
          columns: ['questionId'],
          references: { schema: 'public', table: 'Question', columns: ['id'] },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Session',
        foreignKey: {
          name: 'Session_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Test',
        foreignKey: {
          name: 'Test_examId_fkey',
          columns: ['examId'],
          references: { schema: 'public', table: 'Exam', columns: ['id'] },
          onDelete: 'restrict',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'TestQuestion',
        foreignKey: {
          name: 'TestQuestion_testId_fkey',
          columns: ['testId'],
          references: { schema: 'public', table: 'Test', columns: ['id'] },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'TestQuestion',
        foreignKey: {
          name: 'TestQuestion_questionId_fkey',
          columns: ['questionId'],
          references: { schema: 'public', table: 'Question', columns: ['id'] },
          onDelete: 'restrict',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Topic',
        foreignKey: {
          name: 'Topic_parentId_fkey',
          columns: ['parentId'],
          references: { schema: 'public', table: 'Topic', columns: ['id'] },
          onDelete: 'setNull',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'VerificationToken',
        foreignKey: {
          name: 'VerificationToken_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
