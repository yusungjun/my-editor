import { CompositeDecorator } from "draft-js";
import HashTagComponent from "./hashTag/HashTagComponent";
import { hashtagStrategy } from "./hashTag/HashTagStrategy";
import MentionComponent from "./mention/MentionComponent";
import { mentionStrategy } from "./mention/MentionStrategy";
import UrlComponent from "./url/UrlComponent";
import { urlStrategy } from "./url/UrlTagStrategy";
import LinkComponent from "./link/LinkComponent";
import { linkStrategy } from "./link/LinkStrategy";

export const Strategy = new CompositeDecorator([
    {
        strategy: hashtagStrategy,
        component: HashTagComponent
    },
    {
        strategy: mentionStrategy,
        component: MentionComponent
    },
    {
        strategy: urlStrategy,
        component: UrlComponent
    },
    {
        strategy: linkStrategy,
        component: LinkComponent
    }
]);





