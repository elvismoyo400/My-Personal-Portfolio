"use client";

import { skills, type Skill, type SkillCategory } from "../data/skills";

const skillCategories: SkillCategory[] = [
  "Core",
  "Working knowledge",
  "Currently learning",
];

function SkillCard({
  skill,
  isHidden,
}: {
  skill: Skill;
  isHidden: boolean;
}) {
  const Icon = skill.icon;

  return (
    <li
      aria-hidden={isHidden || undefined}
      className="skill-card"
    >
      <span className="skill-card-icon" aria-hidden="true">
        <Icon focusable="false" />
      </span>
      <h4>{skill.name}</h4>
    </li>
  );
}

export default function SkillsMarquees() {
  return (
    <div className="skill-groups">
      {skillCategories.map((category) => {
        const categorySkills = skills.filter(
          (skill) => skill.category === category,
        );
        const copiesPerLoop = category === "Currently learning" ? 6 : 2;
        const loopSkills = Array.from(
          { length: copiesPerLoop },
          () => categorySkills,
        ).flat();

        return (
          <section
            aria-label={`${category} skills`}
            className="skill-group"
            key={category}
          >
            <h3>{category}</h3>
            <div className="skill-marquee">
              <div className="skill-track">
                {[false, true].map((isDuplicateSet) => (
                  <ul
                    aria-hidden={isDuplicateSet}
                    className="skill-list"
                    key={String(isDuplicateSet)}
                  >
                    {loopSkills.map((skill, index) => (
                      <SkillCard
                        isHidden={isDuplicateSet || index >= categorySkills.length}
                        key={`${skill.name}-${index}`}
                        skill={skill}
                      />
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
