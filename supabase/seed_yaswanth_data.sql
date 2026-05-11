-- Use when tables already exist: applies Yaswanth’s content (wipes prior rows).
-- 1) Run patch_projects_featured.sql if `featured` is missing.
-- 2) Run this script in SQL Editor.

begin;

truncate table public.experience, public.projects, public.skills, public.site_profile restart identity cascade;

insert into public.site_profile (name, tagline, email, linkedin_url, github_url)
values (
  'Yaswanth Dokala',
  'Full-stack engineer building scalable systems and data-driven applications',
  'yaswanthdokala1801@gmail.com',
  'https://www.linkedin.com/in/yaswanth-dokala-791a19253/',
  'https://github.com/dokalayaswanth'
);

-- Skills (55) — same as schema.sql
insert into public.skills (name, category, proficiency, icon, sort_order) values
  ('Python', 'Languages', 92, 'Py', 1),
  ('Java', 'Languages', 90, 'Ja', 2),
  ('C/C++', 'Languages', 88, 'C+', 3),
  ('JavaScript', 'Languages', 93, 'JS', 4),
  ('SQL', 'Languages', 91, 'SQ', 5),
  ('Go', 'Languages', 87, 'Go', 6),
  ('PHP', 'Languages', 82, 'PH', 7);

insert into public.skills (name, category, proficiency, icon, sort_order) values
  ('React', 'Frontend', 94, 'Re', 8),
  ('React Router', 'Frontend', 88, 'RR', 9),
  ('Context API', 'Frontend', 90, 'CA', 10),
  ('Hooks', 'Frontend', 93, 'HK', 11),
  ('Axios', 'Frontend', 89, 'Ax', 12),
  ('HTML', 'Frontend', 95, 'HT', 13),
  ('CSS', 'Frontend', 93, 'CS', 14),
  ('TypeScript', 'Frontend', 92, 'TS', 15),
  ('Bootstrap', 'Frontend', 85, 'BS', 16),
  ('Angular', 'Frontend', 82, 'An', 17);

insert into public.skills (name, category, proficiency, icon, sort_order) values
  ('Spring Boot', 'Backend & APIs', 91, 'SB', 18),
  ('Django', 'Backend & APIs', 90, 'Dj', 19),
  ('CodeIgniter', 'Backend & APIs', 84, 'CI', 20),
  ('REST APIs', 'Backend & APIs', 93, 'RE', 21),
  ('WebSockets', 'Backend & APIs', 88, 'WS', 22),
  ('JWT Authentication', 'Backend & APIs', 90, 'JW', 23);

insert into public.skills (name, category, proficiency, icon, sort_order) values
  ('PostgreSQL', 'Databases', 92, 'PG', 24),
  ('MySQL', 'Databases', 88, 'MY', 25),
  ('MongoDB', 'Databases', 85, 'Mo', 26);

insert into public.skills (name, category, proficiency, icon, sort_order) values
  ('AWS (EC2, S3, RDS, Load Balancer)', 'Cloud & DevOps', 86, 'AW', 27),
  ('Docker', 'Cloud & DevOps', 90, 'Dk', 28),
  ('Docker Compose', 'Cloud & DevOps', 88, 'DC', 29),
  ('CI/CD (Jenkins-style exposure)', 'Cloud & DevOps', 82, 'CI', 30);

insert into public.skills (name, category, proficiency, icon, sort_order) values
  ('CNNs', 'Machine Learning & AI', 85, 'CN', 31),
  ('RNNs', 'Machine Learning & AI', 84, 'RN', 32),
  ('LSTM', 'Machine Learning & AI', 84, 'LS', 33),
  ('DenseNet', 'Machine Learning & AI', 82, 'DN', 34),
  ('VGG16', 'Machine Learning & AI', 80, 'V1', 35),
  ('Transfer Learning', 'Machine Learning & AI', 83, 'TL', 36),
  ('Grad-CAM', 'Machine Learning & AI', 82, 'GC', 37),
  ('Model Evaluation', 'Machine Learning & AI', 88, 'ME', 38),
  ('Data Preprocessing', 'Machine Learning & AI', 90, 'DP', 39);

insert into public.skills (name, category, proficiency, icon, sort_order) values
  ('Git', 'Tools & Platforms', 92, 'Gi', 40),
  ('GitHub', 'Tools & Platforms', 93, 'GH', 41),
  ('Linux', 'Tools & Platforms', 88, 'Li', 42),
  ('Postman', 'Tools & Platforms', 90, 'Po', 43),
  ('VS Code', 'Tools & Platforms', 94, 'VS', 44),
  ('GoDaddy cPanel', 'Tools & Platforms', 75, 'GD', 45),
  ('phpMyAdmin', 'Tools & Platforms', 82, 'pA', 46);

insert into public.skills (name, category, proficiency, icon, sort_order) values
  ('Data Structures', 'Concepts', 92, 'DS', 47),
  ('Algorithms', 'Concepts', 91, 'Al', 48),
  ('OOP', 'Concepts', 93, 'OO', 49),
  ('System Design', 'Concepts', 88, 'SD', 50),
  ('APIs', 'Concepts', 94, 'AP', 51),
  ('Distributed Systems (basics)', 'Concepts', 78, 'DX', 52),
  ('Debugging', 'Concepts', 90, 'Db', 53),
  ('Agile/Scrum', 'Concepts', 88, 'Ag', 54),
  ('SDLC', 'Concepts', 87, 'SL', 55);

insert into public.projects (title, description, tech_stack, github_link, live_link, sort_order, featured)
values (
  'Spartan Exchange (Marketplace Platform)',
  $pd$
Built a full-stack marketplace application designed to manage product listings, user interactions, and transaction workflows. The system includes a React-based frontend for user interaction and a Spring Boot backend for handling API requests. A PostgreSQL database was designed to manage structured data for users, products, and transactions. The application was deployed on AWS EC2 using Docker containers, enabling scalable and reliable hosting. Data normalization techniques were applied to maintain consistency across different entities, and SQL queries were optimized for efficient data retrieval under concurrent usage.
$pd$,
  array['React', 'Spring Boot', 'PostgreSQL', 'Docker', 'AWS EC2', 'SQL', 'REST APIs'],
  'https://github.com/dokalayaswanth',
  null,
  1,
  true
);

insert into public.projects (title, description, tech_stack, github_link, live_link, sort_order, featured)
values (
  'WEBChat – Real-Time Messaging System',
  $pd$
Developed a real-time messaging system using Go and WebSockets to enable communication between multiple users simultaneously. Implemented concurrency using goroutines to efficiently manage multiple client connections. Designed backend services to handle real-time message streaming and persistence using PostgreSQL. Ensured system stability by managing connection lifecycle and handling edge cases such as reconnects and dropped connections.
$pd$,
  array['Go', 'WebSockets', 'PostgreSQL', 'Concurrency', 'REST APIs'],
  'https://github.com/dokalayaswanth',
  null,
  2,
  true
);

insert into public.projects (title, description, tech_stack, github_link, live_link, sort_order, featured)
values (
  'CRM System',
  $pd$
Built a CRM system to manage customer data, order workflows, and credit-based transactions. Developed frontend components using React and backend logic using CodeIgniter (PHP). Designed relational database schemas in MySQL to handle customer and transaction data. Implemented SQL queries to generate reports for tracking payments and outstanding balances. Automated workflows to reduce manual data handling and improve consistency.
$pd$,
  array['React', 'CodeIgniter', 'PHP', 'MySQL', 'SQL'],
  'https://github.com/dokalayaswanth',
  null,
  3,
  false
);

insert into public.experience (role, company, description, start_date, end_date, sort_order)
values (
  'Software Development Engineer Intern',
  'Avinash IT Solutions',
  $ed$
Worked as a full-stack software engineering intern contributing to the development of web applications used in production environments. Developed frontend components using React and integrated them with backend services built using Spring Boot, Django, and Go. Designed and implemented REST APIs to handle data creation, updates, and retrieval. Worked with relational databases such as PostgreSQL and MySQL, designing schemas and optimizing SQL queries for performance. Automated recurring backend processes using cron jobs and scripts to improve workflow efficiency. Debugged production issues by analyzing logs and tracing data flow to identify inconsistencies. Collaborated in Agile teams, participated in sprint cycles, and contributed to feature development, testing, and deployment.
$ed$,
  '2024-06-01',
  null,
  1
);

insert into public.experience (role, company, description, start_date, end_date, sort_order)
values (
  'Machine Learning Project Intern',
  'JNTU Hyderabad',
  $ed$
Worked on developing machine learning systems for medical image classification. Collected and preprocessed large datasets and built training pipelines using Python and PyTorch. Designed experiments to evaluate model performance across multiple configurations and improved accuracy by 20% through hyperparameter tuning. Analyzed incorrect predictions to identify failure cases and improve model robustness. Built evaluation workflows to ensure reliable and consistent model outputs.
$ed$,
  '2023-01-01',
  '2024-05-31',
  2
);

commit;
