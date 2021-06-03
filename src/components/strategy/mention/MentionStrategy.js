import { findWithRegex } from "../common";

export const MENTION_REGEX = /@[\wㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+/g;

export function mentionStrategy(contentBlock, callback, contentState) {
    findWithRegex(MENTION_REGEX, contentBlock, callback);
}
