// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Enum, Option, Struct, Text, Vec, bool, u128, u32, u64 } from '@polkadot/types';
import type { AccountId } from '@polkadot/types/interfaces/runtime';

/** @name Balance */
export interface Balance extends u128 {}

/** @name BalanceOf */
export interface BalanceOf extends Balance {}

/** @name ListOfNames */
export interface ListOfNames extends Vec<Text> {}

/** @name MetaData */
export interface MetaData extends Text {}

/** @name Project */
export interface Project extends Struct {
  readonly ownerID: AccountId;
  readonly reviewers: Option<Vec<AccountId>>;
  readonly reviews: Option<Vec<ReviewID>>;
  readonly badge: Option<bool>;
  readonly metaData: MetaData;
  readonly proposalStatus: ProposalStatus;
}

/** @name ProjectAl */
export interface ProjectAl extends Project {}

/** @name ProjectID */
export interface ProjectID extends u32 {}

/** @name ProposalStatus */
export interface ProposalStatus extends Struct {
  readonly status: Status;
  readonly reason: Reason;
}

/** @name Reason */
export interface Reason extends Enum {
  readonly isOther: boolean;
  readonly asOther: Text;
  readonly isInsufficientMetaData: boolean;
  readonly isMalicious: boolean;
  readonly isPassedRequirements: boolean;
}

/** @name Review */
export interface Review extends Struct {
  readonly proposalStatus: ProposalStatus;
  readonly userID: AccountId;
  readonly content: Text;
  readonly projectID: ProjectID;
}

/** @name ReviewAl */
export interface ReviewAl extends Review {}

/** @name ReviewID */
export interface ReviewID extends u64 {}

/** @name Status */
export interface Status extends Enum {
  readonly isProposed: boolean;
  readonly isAccepted: boolean;
  readonly isRejected: boolean;
}

/** @name TextAl */
export interface TextAl extends Text {}

export type PHANTOM_CHOCOLATEMODULE = 'chocolateModule';
