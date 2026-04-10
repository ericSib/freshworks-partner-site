import { describe, it, expect } from "vitest";
import { buildQuizProperties } from "@/lib/quiz/hubspot";
import type { QuizSubmitPayload } from "@/lib/validation";

function validPayload(
  overrides: Partial<QuizSubmitPayload> = {}
): QuizSubmitPayload {
  return {
    email: "sophie.dsi@acme-corp.fr",
    segment: "itsm",
    overallScore: 62,
    maturityLevel: {
      level: 3,
      labelKey: "quiz.itsm.levels.established.label",
      descriptionKey: "quiz.itsm.levels.established.description",
      ctaKey: "quiz.itsm.levels.established.cta",
      urgency: "medium",
    },
    dimensionScores: {
      incident: 3.3,
      problem: 2.9,
      change: 3.0,
    },
    demographics: {
      companySize: "200_499",
      industry: "tech",
      role: "itDirector",
    },
    weakestDimensions: [
      {
        id: "automation",
        score: 2.5,
        nameKey: "quiz.itsm.dimensions.automation.name",
        commercialAngleKey: "quiz.itsm.dimensions.automation.angle",
      },
      {
        id: "asset_cmdb",
        score: 2.8,
        nameKey: "quiz.itsm.dimensions.asset_cmdb.name",
        commercialAngleKey: "quiz.itsm.dimensions.asset_cmdb.angle",
      },
      {
        id: "problem",
        score: 2.9,
        nameKey: "quiz.itsm.dimensions.problem.name",
        commercialAngleKey: "quiz.itsm.dimensions.problem.angle",
      },
    ],
    ...overrides,
  };
}

describe("buildQuizProperties", () => {
  it("maps every required field onto a HubSpot custom property", () => {
    const props = buildQuizProperties(validPayload());

    expect(props.email).toBe("sophie.dsi@acme-corp.fr");
    expect(props.quiz_segment).toBe("itsm");
    expect(props.quiz_score).toBe("62");
    expect(props.quiz_level).toBe("3");
    expect(props.quiz_company_size).toBe("200_499");
    expect(props.quiz_industry).toBe("tech");
    expect(props.quiz_role).toBe("itDirector");
    expect(props.hs_lead_status).toBe("NEW");
    expect(props.lifecyclestage).toBe("marketingqualifiedlead");
    expect(props.company).toBe("Quiz ITSM lead");
  });

  it("derives firstname from the email local-part", () => {
    const props = buildQuizProperties(
      validPayload({ email: "jean.dupont@example.fr" })
    );
    expect(props.firstname).toBe("Jean");

    const propsUnderscore = buildQuizProperties(
      validPayload({ email: "marc_leroy@example.fr" })
    );
    expect(propsUnderscore.firstname).toBe("Marc");

    const propsPlain = buildQuizProperties(
      validPayload({ email: "sophie@example.fr" })
    );
    expect(propsPlain.firstname).toBe("Sophie");
  });

  it("emits the top 3 weakest dimension ids in order", () => {
    const props = buildQuizProperties(validPayload());
    expect(props.quiz_weakest_dim_1).toBe("automation");
    expect(props.quiz_weakest_dim_2).toBe("asset_cmdb");
    expect(props.quiz_weakest_dim_3).toBe("problem");
  });

  it("fills empty slots when fewer than 3 weakest dimensions are provided", () => {
    const payload = validPayload({
      weakestDimensions: [
        {
          id: "automation",
          score: 2,
          nameKey: "quiz.itsm.dimensions.automation.name",
          commercialAngleKey: "quiz.itsm.dimensions.automation.angle",
        },
      ],
    });

    const props = buildQuizProperties(payload);
    expect(props.quiz_weakest_dim_1).toBe("automation");
    expect(props.quiz_weakest_dim_2).toBe("");
    expect(props.quiz_weakest_dim_3).toBe("");
  });

  it("stamps an ISO-8601 submitted_at timestamp", () => {
    const props = buildQuizProperties(validPayload());
    expect(props.quiz_submitted_at).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/
    );
    // Must be parseable back to a Date.
    expect(Number.isNaN(Date.parse(props.quiz_submitted_at))).toBe(false);
  });

  it("labels CX leads with the CX company marker", () => {
    const props = buildQuizProperties(validPayload({ segment: "cx" }));
    expect(props.company).toBe("Quiz CX lead");
    expect(props.quiz_segment).toBe("cx");
  });

  it("uses the translator when provided to resolve the maturity label", () => {
    const t = (key: string) =>
      key === "quiz.itsm.levels.established.label" ? "Established" : key;
    const props = buildQuizProperties(validPayload(), t);
    expect(props.quiz_maturity_label).toBe("Established");
  });

  it("falls back to the raw i18n key when no translator is provided", () => {
    const props = buildQuizProperties(validPayload());
    expect(props.quiz_maturity_label).toBe(
      "quiz.itsm.levels.established.label"
    );
  });
});
