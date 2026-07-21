import { Router } from "express";
import {
  InputData,
  jsonInputForTargetLanguage,
  type LanguageName,
  type Options,
  quicktype,
} from "quicktype-core";

const typegenController = Router();

const TYPEGEN_CONFIG: Record<string, Partial<Options>> = {
  typescript: {
    lang: "typescript",
    rendererOptions: { "just-types": "true" },
    indentation: "  ",
  },
  java: {
    lang: "java",
    rendererOptions: { "just-types": "true", package: "com.example" },
  },
  csharp: {
    lang: "csharp",
    rendererOptions: {
      namespace: "Example",
      features: "attributes-only",
      "just-types": true,
      "keep-property-name": true,
    },
  },
};

typegenController.post("/:lang", (req, res, next) => {
  const handler = async () => {
    try {
      const { lang } = req.params;
      const jsonInput = jsonInputForTargetLanguage(lang as LanguageName);
      await jsonInput.addSource({
        name: "Example",
        samples: [JSON.stringify(req.body)],
      });
      const inputData = new InputData();
      inputData.addInput(jsonInput);
      const result = await quicktype({
        inputData,
        ...TYPEGEN_CONFIG[lang],
      });
      res.json(result.lines);
    } catch (err) {
      next(err);
    }
  };
  void handler();
});

export default typegenController;
