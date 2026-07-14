import path from "path";

import { CreateWebpackConfigArgs } from "gatsby";
import { CompilerOptions } from "typescript";

import { compilerOptions } from "../../tsconfig.json";

const onCreateWebpackConfig = (
  (options: Pick<CompilerOptions, "paths">) =>
  ({ actions, getConfig }: CreateWebpackConfigArgs) => {
    actions.setWebpackConfig({
      resolve: {
        alias: Object.entries(options.paths || []).reduce(
          (aliases, [name, [target]]) => ({
            ...aliases,
            [name]: path.resolve(target),
          }),
          {},
        ),
      },
    });

    // CSS Modules already scope every class name to its own file, so the
    // order two unrelated module.scss files are extracted in has no visual
    // effect. Silence mini-css-extract-plugin's "Conflicting order"
    // warning, which otherwise fires whenever the same module is pulled in
    // by different page templates in a different relative order.
    const config = getConfig();
    const miniCssExtractPlugin = config.plugins?.find(
      (plugin: { constructor: { name: string } }) =>
        plugin.constructor.name === "MiniCssExtractPlugin",
    );
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true;
      actions.replaceWebpackConfig(config);
    }
  }
)(compilerOptions);

export { onCreateWebpackConfig };
