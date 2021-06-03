/* eslint-disable no-useless-escape */
import { findWithRegex } from "../common";

const REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm

    
export function urlStrategy(contentBlock, callback, contentState) {
    findWithRegex(REGEX, contentBlock, callback);
}