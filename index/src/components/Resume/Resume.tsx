import Socials from './Components/Socials'
import {
  Section,
  SectionDescription,
  SectionHeader,
  SubSectionDescription,
  SubSectionHeader,
  SubSectionSkills,
  Title,
} from './Components/Section'
import StyledLink from '../Link/Link'

export default function Resume() {
  return (
    <div className="flex flex-col">
      <div className="h-8"></div>
      <Section>
        <Title>Kim Yongbeom</Title>
        <SectionHeader sticky={false}>
          Year 3 Computer Science Student
        </SectionHeader>
        <SectionDescription>
          <p>
            I might not be able to design a webpage to save my life, but I can
            write and deploy its backend endpoints.
          </p>
        </SectionDescription>
      </Section>
      <Section>
        <Socials />
      </Section>
      <Section>
        <SectionHeader>ABOUT</SectionHeader>
        <SectionDescription>
          <p>
            In 2021, I told myself, "Hey, I like the problem-solving of CS" and
            dove headfirst into the major. Since then, I've been exploring every
            single thing I could - from the standard fullstack web development
            to slightly more obscure SysAdmin projects.
          </p>
          <p>
            Today, I still find myself more interested in the problems
            themselves, rather than the technical details - all the way from
            LeetCode problems to bus scheduling apps on Jeju Island (Seriously,
            even I could do better).
          </p>
          <p>
            {' '}
            When I am not buried in schoolwork or a project, I am either playing
            Tetris, watching videos/dramas, or hanging out with my girlfriend.
          </p>
        </SectionDescription>
      </Section>
      <Section>
        <SectionHeader>EDUCATION</SectionHeader>
        <SubSectionHeader>
          Bachelor of Computing in Computer Science · National University of
          Singapore
        </SubSectionHeader>
        <SubSectionDescription>CAP/GPA: 4.2/5.0</SubSectionDescription>
      </Section>
      <Section>
        <SectionHeader>EXPERIENCE</SectionHeader>
        <SubSectionHeader info="May 2024 — Oct 2024, Singapore">
          Backend Engineer Intern ·{' '}
          <StyledLink target="_blank" href="https://www.jublia.com">
            Jublia
          </StyledLink>
        </SubSectionHeader>
        <SubSectionDescription>
          <p>Backend engineer developing services engagement during events.</p>
          <p>
            Currently implementing and optimizing event hall routing and
            navigation algorithms.
          </p>
        </SubSectionDescription>
        <SubSectionSkills>
          {[
            'Python',
            'Flask',
            'MySQL',
            'Redis',
            'AWS Neptune (Graph DB)',
            'OpenCV',
          ]}
        </SubSectionSkills>
        <SubSectionHeader info="May 2023 — May 2024, Singapore">
          Software Engineering & DevOps Intern ·{' '}
          <StyledLink target="_blank" href="https://www.fabrica.ai">
            Fabrica.AI
          </StyledLink>
        </SubSectionHeader>
        <SubSectionDescription>
          <p>
            Sped up development process by 60% by developing and introducing
            CI/CD pipelines for Docker images.
          </p>
          <p>
            Set up and managed internal company tools on both cloud and local
            deployments.
          </p>
        </SubSectionDescription>
        <SubSectionSkills>
          {[
            'Python',
            'Bash',
            'Make',
            'Docker',
            'Github Actions',
            'Hetzner (Cloud)',
            'Nginx',
          ]}
        </SubSectionSkills>
        <SubSectionHeader info="Dec 2023 — Jan 2024, Singapore">
          Web Developer Intern ·{' '}
          <StyledLink target="_blank" href="https://www.growthbeans.com">
            GrowthBeans
          </StyledLink>
        </SubSectionHeader>
        <SubSectionDescription>
          <p>
            Developed frontend pages and NoSQL Database schemas for a new
            community-building platform.
          </p>
        </SubSectionDescription>
        <SubSectionSkills>
          {[
            'TypeScript',
            'React',
            'Vite',
            'Tailwind',
            'Google Cloud Platform',
            'Firebase Storage',
            'Firestore DB',
          ]}
        </SubSectionSkills>
        <SubSectionHeader info="Jan 2023 — Dec 2023, Singapore">
          Part-Time Student Developer ·{' '}
          <StyledLink target="_blank" href="https://sourceacademy.org">
            Source Academy
          </StyledLink>
        </SubSectionHeader>

        <SubSectionDescription>
          {/* TODO: link to module */}
          <p>
            Integrated WebAssembly into Source Academy, an introductory learning
            platform for programming.
          </p>
          <p>
            I Developed the{' '}
            <StyledLink
              target="_blank"
              href="https://source-academy.github.io/modules/documentation/modules/wasm.html"
            >
              <code>wasm</code>
            </StyledLink>{' '}
            module (
            <StyledLink
              target="_blank"
              href="https://github.com/source-academy/wabt"
            >
              GitHub
            </StyledLink>
            ): an WebAssembly Text-to-Bytecode compiler and an integration of
            the WebAssembly runtime into the platform frontend.
          </p>
        </SubSectionDescription>
        <SubSectionSkills>
          {['WebAssembly', 'TypeScript', 'C++', 'CPP (C Preprocessor)']}
        </SubSectionSkills>
      </Section>
      <Section>
        <SectionHeader>PROJECTS</SectionHeader>
        <SubSectionHeader>
          <StyledLink target="_blank" href="https://tts.yongbeom.com">
            <code>tts.yongbeom.com</code>
          </StyledLink>
          (
          <StyledLink
            target="_blank"
            href="https://github.com/Yongbeom-Kim/yongbeom.com/tree/main/tts"
          >
            GitHub
          </StyledLink>
          )
        </SubSectionHeader>
        <SubSectionDescription>
          <p>
            Web Interface as a tts (Text To Speech) service. This is a web-based
            wrapper around OpenAI's whisper model.
          </p>
          <p>
            Hosted on a RunPod serverless GPU instance with a flask proxy on AWS
            Lambda. When I have time, I will write an OAuth server under{' '}
            <code>auth.yongbeom.com</code> for authentication.
          </p>
        </SubSectionDescription>
        <SubSectionSkills>
          {['Python', 'Flask', 'RunPod', 'AWS', 'Terraform']}
        </SubSectionSkills>
        <SubSectionHeader>
          <StyledLink target="_blank" href="https://chemquest.fly.dev">
            ChemQuest
          </StyledLink>
        </SubSectionHeader>
        <SubSectionDescription>
          <p>
            Web service in collaboration with NUS Chemistry to procedurally
            generate spectroscopy questions for students, with no intervention
            from faculty.
          </p>
          <p>
            Spectroscopic data is obtained from manually scraping Chemistry
            database websites.
          </p>
        </SubSectionDescription>
        <SubSectionSkills>
          {['Python', 'Flask', 'Selenium (WebDriver)']}
        </SubSectionSkills>
        <SubSectionHeader>
          RBZ Academic Review Extension (
          <StyledLink
            target="_blank"
            href="https://github.com/Yongbeom-Kim/academic-review-extension/tree/main"
          >
            GitHub
          </StyledLink>
          )
        </SubSectionHeader>
        <SubSectionDescription>
          Cross-browser extension to automate metadata research for the Raffles
          Bulletin of Zoology.
        </SubSectionDescription>
        <SubSectionSkills>{['Typescript', 'React']}</SubSectionSkills>
        <SubSectionHeader>ITS Compliation Error Repair</SubSectionHeader>
        <SubSectionDescription>
          Java service to automatically repair errors in student programs.
          Developed for CS2030S tutors at NUS.
        </SubSectionDescription>
        <SubSectionSkills>{['Java']}</SubSectionSkills>
        <SubSectionHeader>SIMPLE Static Analyzer</SubSectionHeader>
        <SubSectionDescription>
          <p>
            C++ Parser and static analyser for SIMPLE, a toy language. CS3213
            project (group of 5).
          </p>
          <p>Developed the tokenizer and parser for the language.</p>
        </SubSectionDescription>
        <SubSectionSkills>{['C++']}</SubSectionSkills>
      </Section>
    </div>
  )
}
