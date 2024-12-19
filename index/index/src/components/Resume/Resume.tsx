import Socials from './Components/Socials'
import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionNav,
  SubSectionDescription,
  SubSectionHeader,
  SubSectionSkills,
  Title,
} from './Components/Section'
import StyledLink from '../Link/Link'

export default function Resume() {
  return (
    <>
      <header className="lg:sticky lg:top-0 lg:h-screen lg:w-1/2 lg:col-span-1 lg:pl-10 lg:pr-32">
        <div className="h-8"></div>
        <Section className="lg:col-start-1 lg:col-end-1">
          <Title>Kim Yongbeom</Title>
          <SectionHeader sticky={false}>
            Final Year Computer Science Student (NUS)
          </SectionHeader>
          <SectionDescription>
            <p>
              Fullstack engineer. I find great joy in solving problems, and
              empowering people with technology. Loves Education Technology,
              Linux and Oxford commas.
            </p>
          </SectionDescription>
        </Section>
        <SectionNav
          headers={[
            'ABOUT',
            'EDUCATION',
            'EXPERIENCE',
            'PROJECTS',
            'PUBLICATIONS',
          ]}
          className="hidden lg:block"
        />
        <Section className="lg:col-start-1 lg:col-end-1">
          <Socials />
        </Section>
      </header>
      <div className="lg:w-1/2 lg:absolute lg:top-0 lg:right-0 lg:pl-20 lg:pr-24 py-24">
        <Section>
          <SectionHeader className="lg:asdfasdf">ABOUT</SectionHeader>
          <SectionDescription>
            <p>
              In 2021, I chose to do go into CS on a whim. And if I were to toot
              my own horn, what a good decision it was. Since then, I've gone an
              explored as many technologies as I could, from languages, tools
              and frameworks, to the not-so-free cloud and databases.
            </p>
            <p>
              Today, instead of what technologies to use, I find myself more
              interested in the problems themselves. Do the technologies
              themselves matter? Not really, as long as it suits the problem.
              Beyond tech projects, I find myself interested in pedagogy and
              education, and I've co-written some publications on the topic.
              Much thanks to Dr Fung for the opportunity.
            </p>
            <p>
              When I am not buried in schoolwork or a project, I am either
              playing Tetris, watching videos/dramas, or hanging out with my
              girlfriend. I will be graduating from NUS in December 2025.
            </p>
          </SectionDescription>
        </Section>
        <Section>
          <SectionHeader>SKILLS</SectionHeader>
          <SectionDescription>
            <span>
              <span className="dark:text-slate-100 text-slate-950">
                Languages:
              </span>{' '}
              JavaScript/TypeScript · Python · Java · Go · C++ · HTML/CSS · Bash
              · Make
            </span>
            <span>
              <span className="dark:text-slate-100 text-slate-950">Tools:</span>{' '}
              Unix · Docker · GitHub Actions · CircleCI · React · NextJS ·
              Express.js · Flask · SQLAlchemy · Selenium (Web Scraping)
            </span>
            <span>
              <span className="dark:text-slate-100 text-slate-950">
                Databases:
              </span>{' '}
              PostgreSQL · MySQL · SQLite · Redis · Firestore
            </span>
            <span>
              <span className="dark:text-slate-100 text-slate-950">Cloud:</span>{' '}
              Terraform · Amazon Web Services · Hetzner · Google Cloud Platform
            </span>
          </SectionDescription>
        </Section>
        <Section>
          <SectionHeader className="lg:asdfasdf">EDUCATION</SectionHeader>
          <SubSectionHeader>
            Bachelor of Computing in Computer Science · National University of
            Singapore
          </SubSectionHeader>
          <SubSectionDescription>CAP/GPA: 4.2/5.0</SubSectionDescription>
        </Section>
        <Section>
          <SectionHeader className="lg:asdfasdf">EXPERIENCE</SectionHeader>
          <SubSectionHeader info="May 2024 — Aug 2024, Singapore">
            Backend Engineer Intern ·{' '}
            <StyledLink target="_blank" href="https://www.jublia.com">
              Jublia
            </StyledLink>
          </SubSectionHeader>
          <SubSectionDescription>
            <p>
              As a backend engineer, I focused on developing services to enhance
              engagement during events.
            </p>
            <p>
              • Boosted event map pathfinding performance by over 60% with a
              novel OpenCV and unsupervised clustering approach, enabling
              real-time user navigation.
            </p>
            <p>
              • Developed 3 Flask API endpoints for pathfinding algorithm
              interface with event organizers and attendees.
            </p>
            <p>
              • Implemented storage and caching in MySQL and Redis to improve
              backend performance in Flask endpoints.
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
          <SubSectionHeader info="May 2023 — Dec 2023, Singapore">
            Software Engineering & DevOps Intern ·{' '}
            <StyledLink target="_blank" href="https://www.fabrica.ai">
              Fabrica.AI
            </StyledLink>
          </SubSectionHeader>
          <SubSectionDescription>
            <p>
              Initially, I came in as a software engineer working on robot
              control, but I really liked doing DevOps here!
            </p>
            <p>
              • I implemented Fabrica.AI's first CI/CD pipeline using Docker &
              GitHub Actions, speeding up development lifecycle by 60%.
            </p>
            <p>
              • Cut ARM Docker build times by over 90% by transitioning from
              QEMU emulation / building on robotic hardware to ARM-based Linux
              servers for CI/CD, enabling same-day testing on both software and
              robotic hardware.
            </p>
            <p>
              • Migrated internal tools to Hetzner servers with Nginx, improving
              stability and reducing latency by up to 40%.
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
          {/* <SubSectionHeader info="Dec 2023 — Jan 2024, Singapore">
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
          </SubSectionSkills> */}
        </Section>
        <Section>
          <SectionHeader className="lg:asdfasdf">PROJECTS</SectionHeader>
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
              Web Interface as a speech to text transcription service with
              OpenAI Whisper. When I made this, I hated how expensive
              transcription APIs were, despite how cheap it was to run the
              Whipser transcription model.
            </p>
            <p>• Cost of &lt;10% of managed transcription APIs.</p>
            <p>
              • Built with React frontend and Dockerized Flask backend, deployed
              using Terraform on AWS.
            </p>
            <p>
              • Deployed OpenAI Whisper model on RunPod for cost-effective
              transcription.
            </p>
          </SubSectionDescription>
          <SubSectionSkills>
            {['Python', 'Flask', 'RunPod', 'AWS', 'Terraform']}
          </SubSectionSkills>
          <SubSectionHeader>
            <StyledLink target="_blank" href="https://hydragen.fly.dev">
              Hydragen
            </StyledLink>
          </SubSectionHeader>
          <SubSectionDescription>
            <p>
              Web service in collaboration with NUS Chemistry to generate
              personalized spectroscopy questions for students, with no
              intervention from faculty.
            </p>
            <p>
              • Scraped spectroscopic data of over 50,000 molecules with a web
              scraper in Python and Selenium.
            </p>
            <p>
              • Developed a Flask/PostgreSQL recommendation system based on Elo
              ratings to personalize questions for students.
            </p>
          </SubSectionDescription>
          <SubSectionSkills>
            {['Python', 'Flask', 'Selenium (WebDriver)']}
          </SubSectionSkills>
          <SubSectionHeader>
            <StyledLink
              target="_blank"
              href="https://source-academy.github.io/modules/documentation/modules/wasm.html"
            >
              WebAssembly Module @ Source Academy
            </StyledLink>{' '}
            (
            <StyledLink
              target="_blank"
              href="https://github.com/source-academy/wabt"
            >
              GitHub
            </StyledLink>
            )
          </SubSectionHeader>
          <SubSectionDescription>
            <p>
              I wrote the{' '}
              <code>
                <StyledLink
                  target="_blank"
                  href="https://source-academy.github.io/modules/documentation/modules/wasm.html"
                >
                  wasm
                </StyledLink>
              </code>{' '}
              module, a WebAssembly Text-to-bytecode compiler written in
              TypeScript (&gt;10k LoC).
            </p>
            <p>
              • Integrated the V8 WebAssembly runtime into Source Academy for
              students to run stack-based virtual machines.
            </p>
            <p>
              • Developed a Flask/PostgreSQL recommendation system based on Elo
              ratings to personalize questions for students.
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
            Cross-browser extension to automate metadata research for the
            Raffles Bulletin of Zoology.
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

        <Section>
          <SectionHeader>PUBLICATIONS</SectionHeader>
          <SectionDescription>
            <p>
              <StyledLink
                target="_blank"
                href="https://doi.org/10.1039/9781839167942-00376"
              >
                <span className="dark:text-slate-100 text-slate-950">
                  Bringing Back Learning Communities in the 21st Century
                </span>
              </StyledLink>
              <br />
              FM Fung,{' '}
              <span className="dark:text-slate-300 text-slate-900">Y Kim</span>
              <br />
              Royal Society of Chemistry, 2023
            </p>
            <p>
              <StyledLink
                target="_blank"
                href="https://doi.org/10.1021/acs.jchemed.2c00553"
              >
                <span className="dark:text-slate-100 text-slate-950">
                  Supplementary Discourse-Forming an Online Learning Community
                  with Asynchronous Discussions
                </span>
              </StyledLink>
              <br />
              <span className="dark:text-slate-300 text-slate-900">Y Kim</span>,
              CI Wijaya Ong, FM Fung
              <br />
              Journal of Chemical Education 100 (2), 496-506, 2023
            </p>
            <p>
              <StyledLink
                target="_blank"
                href="https://doi.org/10.1021/acs.jchemed.1c00842"
              >
                <span className="dark:text-slate-100 text-slate-950">
                  Supporting social and learning presence in the revised
                  community of inquiry framework for hybrid learning
                </span>
              </StyledLink>
              <br />
              BJM Ng, JY Han,{' '}
              <span className="dark:text-slate-300 text-slate-900">Y Kim</span>,
              KA Togo, JY Chew, Y Lam, FM Fung
              <br />
              Journal of Chemical Education 99 (2), 708-714, 2021
            </p>
            <p>
              <StyledLink
                target="_blank"
                href="https://doi.org/10.1109/TALE52509.2021.9678925"
              >
                <span className="dark:text-slate-100 text-slate-950">
                  Does team teaching improve student engagement in an age of
                  digital learning
                </span>
              </StyledLink>
              <br />
              <span className="dark:text-slate-300 text-slate-900">Y Kim</span>,
              JY Han, FM Fung
              <br />
              2021 IEEE International Conference on Engineering, Technology &
              Education, 2021
            </p>
            <p>
              <StyledLink
                target="_blank"
                href="https://doi.org/10.1109/TALE52509.2021.9678765"
              >
                <span className="dark:text-slate-100 text-slate-950">
                  ChemPOV: Digitizing an Organic Chemistry Boardgame to Support
                  Online Learning
                </span>
              </StyledLink>
              <br />
              FM Fung, Y Lam, J Yap, DA Musalli, JY Han, K Togo,{' '}
              <span className="dark:text-slate-300 text-slate-900">Y Kim</span>
              <br />
              2021 IEEE International Conference on Engineering, Technology &
              Education, 2021
            </p>
            <p>
              <StyledLink
                target="_blank"
                href="https://scholar.archive.org/work/2psryiwzrncnzdbbgwl5jfgkau/access/wayback/http://publi.math.unideb.hu/load_pdf.php?p=2431"
              >
                <span className="dark:text-slate-100 text-slate-950">
                  A sharp trigonometric double inequality
                </span>
              </StyledLink>
              <br />
              <span className="dark:text-slate-300 text-slate-900">Y Kim</span>,
              TY Lee, S Vengat, HX Sim, JKH Tai
              <br />
              Publicationes Mathematicae-Debrecen 98 (1-2), 231-242, 2021
            </p>
            <p>
              <StyledLink
                target="_blank"
                href="https://doi.org/10.1016/B978-0-12-822879-1.00010-X"
              >
                <span className="dark:text-slate-100 text-slate-950">
                  Adopting a flipped classroom to teach and learn SciFinder in
                  an undergraduate chemistry laboratory course
                </span>
              </StyledLink>
              <br />H Anuar,{' '}
              <span className="dark:text-slate-300 text-slate-900">Y Kim</span>,
              TH Tan, FM Fung
              <br />
              Technology-Enabled Blended Learning Experiences for Chemistry
              Education, 2021
            </p>
            <p>
              <StyledLink
                target="_blank"
                href="https://www.channelnewsasia.com/commentary/parents-academic-stress-psle-students-exam-children-1825846"
              >
                <span className="dark:text-slate-100 text-slate-950">
                  Commentary: Parents play an outsized role in academic stress
                  children face
                </span>
              </StyledLink>
              <br />
              FM Fung,{' '}
              <span className="dark:text-slate-300 text-slate-900">Y Kim</span>
              <br />
              Channel News Asia, 2021
            </p>
          </SectionDescription>
        </Section>
      </div>
    </>
  )
}
