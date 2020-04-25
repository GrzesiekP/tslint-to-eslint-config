import chalk from "chalk";
import { EOL } from "os";

import { logger, Logger } from "../adapters/logger";
import { Inject } from "../inject";
import { RuleConversionResults } from "../rules/convertRules";
import { ESLintRuleOptions, TSLintRuleOptions } from "../rules/types";
import {
    logFailedConversions,
    logMissingConversionTarget,
    logMissingPlugins,
    logSuccessfulConversions,
} from "./reportOutputs";

export const reportConversionResults = (
    inject: Inject,
    ruleConversionResults: RuleConversionResults,
) => {
    if (ruleConversionResults.converted.size !== 0) {
        logSuccessfulConversions("rule", ruleConversionResults.converted, inject(logger));
        logNotices(ruleConversionResults.converted, inject(logger));
    }

    if (ruleConversionResults.failed.length !== 0) {
        logFailedConversions(ruleConversionResults.failed, inject(logger));
    }

    if (ruleConversionResults.missing.length !== 0) {
        logMissingConversionTarget(
            "rule",
            (setting: TSLintRuleOptions) =>
                `tslint-to-eslint-config does not know the ESLint equivalent for TSLint's "${setting.ruleName}"${EOL}`,
            ruleConversionResults.missing,
            inject(logger),
            [
                ruleConversionResults.missing.length === 1
                    ? "defaulting to eslint-plugin-tslint for it."
                    : "defaulting to eslint-plugin-tslint for these rules.",
            ],
        );
    }

    if (ruleConversionResults.plugins.size !== 0) {
        logMissingPlugins(ruleConversionResults.plugins, inject(logger));
    }
};

type RuleWithNotices = {
    notices: any[];
    ruleName: string;
};

const logNotices = (converted: Map<string, ESLintRuleOptions>, logger: Logger) => {
    const rulesWithNotices = Array.from(converted.values()).filter(
        (ruleOptions) => ruleOptions.notices && ruleOptions.notices.length >= 1,
    ) as RuleWithNotices[];

    if (rulesWithNotices.length !== 0) {
        logger.stdout.write(chalk.yellowBright(`${EOL}❗ ${rulesWithNotices.length} ESLint`));

        if (rulesWithNotices.length === 1) {
            logger.stdout.write(
                chalk.yellowBright(
                    ` rule behaves differently from its TSLint counterpart ❗${EOL}`,
                ),
            );
        } else {
            logger.stdout.write(
                chalk.yellowBright(
                    ` rules behave differently from their TSLint counterparts ❗${EOL}`,
                ),
            );
        }

        for (const rule of rulesWithNotices) {
            logger.stdout.write(chalk.yellow(`  * ${rule.ruleName}:${EOL}`));

            for (const notice of rule.notices) {
                logger.stdout.write(chalk.yellow(`    - ${notice}${EOL}`));
            }
        }
    }
};
