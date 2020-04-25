import { mergeBanTypes } from "./mergers/ban-types";
import { mergeConsistentTypeAssertions } from "./mergers/consistent-type-assertions";
import { mergeIndent } from "./mergers/indent";
import { mergeNoCaller } from "./mergers/no-caller";
import { mergeNoEval } from "./mergers/no-eval";
import { mergeNoMemberDelimiterStyle } from "./mergers/member-delimiter-style";
import { mergeNoUnnecessaryTypeAssertion } from "./mergers/no-unnecessary-type-assertion";

export const ruleMergers = new Map([
    ["@typescript-eslint/ban-types", mergeBanTypes],
    ["@typescript-eslint/consistent-type-assertions", mergeConsistentTypeAssertions],
    ["@typescript-eslint/indent", mergeIndent],
    ["@typescript-eslint/member-delimiter-style", mergeNoMemberDelimiterStyle],
    ["@typescript-eslint/no-unnecessary-type-assertion", mergeNoUnnecessaryTypeAssertion],
    ["no-caller", mergeNoCaller],
    ["no-eval", mergeNoEval],
]);
