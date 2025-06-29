import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    {
      input: "src",
      outDir: "dist",
      builder: "mkdist",
    },
  ],
  clean: true,
  declaration: true,
});
