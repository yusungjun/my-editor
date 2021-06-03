import { findWithRegex } from "../common";

export const HASHTAG_REGEX = /#[\wㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+/g;

export function hashtagStrategy(contentBlock, callback, contentState) {
    findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}
