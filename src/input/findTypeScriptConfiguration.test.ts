import { findTypeScriptConfiguration } from "./findTypeScriptConfiguration";
import { createStubExec } from "../adapters/exec.stubs";

describe("findTypeScriptConfiguration", () => {
    it("defaults the configuration file when one isn't provided", async () => {
        // Arrange
        const dependencies = { exec: createStubExec() };

        // Act
        await findTypeScriptConfiguration(dependencies, undefined);

        // Assert
        expect(dependencies.exec).toHaveBeenLastCalledWith("cat ./tsconfig.json");
    });

    it("includes a configuration file in the TypeScript command when one is provided", async () => {
        // Arrange
        const dependencies = { exec: createStubExec() };
        const config = "./custom/tsconfig.json";

        // Act
        await findTypeScriptConfiguration(dependencies, config);

        // Assert
        expect(dependencies.exec).toHaveBeenLastCalledWith("cat ./custom/tsconfig.json");
    });

    it("applies TypeScript defaults when none are provided", async () => {
        // Arrange
        const dependencies = { exec: createStubExec({ stdout: "{}" }) };
        const config = "./tsconfig.json";

        // Act
        const result = await findTypeScriptConfiguration(dependencies, config);

        // Assert
        expect(result).toEqual({});
    });
});
