// src/components/jobpage/JobPage.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./jobpage.scss";

// Example data
const examsData = [
  {
    id: 1,
    jobTitle: "Indian Navy Officer",
    description:
      "Indian Navy Officers are responsible for leading and managing naval operations, ensuring the defense of India's maritime interests. They undergo rigorous training in navigation, weapon systems, and leadership skills. Officers command ships, submarines, or naval aviation units, coordinating complex missions and ensuring crew safety. They also engage in humanitarian missions and disaster relief operations. Successful candidates play a crucial role in maintaining maritime security, contributing to national defense, and upholding India’s strategic interests at sea.",
    minAge: 19,
    maxAge: 25,
    qualificationRequired: "Engineering Graduate",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-01-05",
    applicationEndDate: "2024-02-05",
    imageUrl: "/inf.png",
    tag: "new",
    websiteUrl: "https://joinindiannavy.gov.in",
  },
  {
    id: 2,
    jobTitle: "SSC CGL",
    description:
      "The SSC CGL (Staff Selection Commission Combined Graduate Level) examination is a competitive test for recruitment into various administrative and ministerial posts in the Government of India. Candidates are evaluated on their quantitative aptitude, general intelligence, English comprehension, and general awareness. Successful candidates can secure positions in ministries, departments, and organizations, playing vital roles in public service, policy implementation, and administrative support, contributing to efficient governance and public administration.",
    minAge: 20,
    maxAge: 30,
    qualificationRequired: "Graduate",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-08-15",
    applicationEndDate: "2024-09-15",
    imageUrl: "/ssc.png",
    tag: "new",
    websiteUrl: "https://ssc.nic.in",
  },
  {
    id: 3,
    jobTitle: "IBPS PO",
    description:
      "The IBPS PO (Institute of Banking Personnel Selection Probationary Officer) examination is a competitive test for the recruitment of officers in various public sector banks in India. Candidates are assessed on their quantitative aptitude, reasoning ability, English language skills, and general awareness. Successful candidates serve as bank officers, responsible for managing customer relations, overseeing operations, and contributing to the overall growth of the bank, while ensuring compliance with banking regulations and policies.",
    minAge: 21,
    maxAge: 30,
    qualificationRequired: "Graduate",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-07-01",
    applicationEndDate: "2024-08-01",
    imageUrl: "/ibps-po.png",
    tag: "banking",
    websiteUrl: "https://ibps.in",
  },
  {
    id: 4,
    jobTitle: "RBI Grade B Officer",
    description:
      "The RBI Grade B Officer examination is a competitive test conducted by the Reserve Bank of India for recruiting managerial positions. Candidates are evaluated on their understanding of economics, finance, banking regulations, and general awareness. Successful candidates manage monetary policy, supervise financial institutions, and contribute to the formulation of regulatory frameworks. As key players in the financial sector, they ensure economic stability and support the RBI's mission to foster a robust banking system.",
    minAge: 21,
    maxAge: 30,
    qualificationRequired: "Graduate",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-05-10",
    applicationEndDate: "2024-06-10",
    imageUrl: "/rbi.png",
    tag: "new",
    websiteUrl: "https://rbi.org.in",
  },
  {
    id: 5,
    jobTitle: "Indian Railway Engineer",
    description:
      "The Indian Railway Engineer position involves overseeing the planning, design, construction, and maintenance of railway infrastructure. Engineers are responsible for ensuring the safety and efficiency of railway operations, managing projects related to track, signaling, and station facilities. They collaborate with various departments to implement innovative solutions and improve service delivery. Successful candidates play a crucial role in modernizing the railway network, enhancing connectivity, and supporting the growth of India's transportation infrastructure.",
    minAge: 20,
    maxAge: 33,
    qualificationRequired: "Engineering Graduate",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-03-12",
    applicationEndDate: "2024-04-12",
    imageUrl: "/railway-engineer.png",
    tag: "engineering",
    websiteUrl: "https://indianrailways.gov.in",
  },
  {
    id: 6,
    jobTitle: "ISRO Scientist/Engineer",
    description:
      "The ISRO Scientist/Engineer position involves conducting research and development in the fields of space science, satellite technology, and space exploration. Candidates work on innovative projects related to satellite design, launch vehicle development, and remote sensing applications. They collaborate with multidisciplinary teams to advance India's space capabilities and contribute to national missions. Successful candidates play a vital role in shaping the future of space technology and enhancing India's presence in the global space arena.",
    minAge: 21,
    maxAge: 35,
    qualificationRequired: "Engineering Graduate",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-06-05",
    applicationEndDate: "2024-07-05",
    imageUrl: "/isro.png",
    tag: "science",
    websiteUrl: "https://isro.gov.in",
  },
  {
    id: 7,
    jobTitle: "NDA (National Defence Academy)",
    description:
      "The NDA (National Defence Academy) program trains young cadets to become future leaders in the Indian Armed Forces. Candidates undergo rigorous physical and academic training in various disciplines, including military tactics, leadership, and strategic studies. The program fosters discipline, teamwork, and resilience, preparing cadets for service as officers in the Army, Navy, and Air Force. Successful graduates play a crucial role in defending the nation and contributing to national security and peacekeeping efforts.",
    minAge: 16.5,
    maxAge: 19.5,
    qualificationRequired: "12th Pass",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-04-15",
    applicationEndDate: "2024-05-15",
    imageUrl: "/nda.png",
    tag: "new",
    websiteUrl: "https://upsconline.nic.in",
  },
  {
    id: 8,
    jobTitle: "Indian Coast Guard",
    description:
      "The Indian Coast Guard safeguards the nation’s maritime interests by enforcing maritime law, conducting search and rescue operations, and ensuring coastal security. Officers are responsible for patrolling India's vast coastline, protecting marine resources, and preventing smuggling and illegal activities. They collaborate with other defense forces during emergencies and natural disasters. Successful candidates play a key role in maintaining maritime peace, safety, and environmental protection, contributing to national defense and disaster response efforts.",
    minAge: 18,
    maxAge: 25,
    qualificationRequired: "12th Pass",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-08-20",
    applicationEndDate: "2024-09-20",
    imageUrl: "/coast-guard.png",
    tag: "defence",
    websiteUrl: "https://joinindiancoastguard.gov.in",
  },
  {
    id: 9,
    jobTitle: "Indian Army JCO",
    description:
      "The Indian Army Junior Commissioned Officer (JCO) plays a crucial role in leading and managing troops in various operational and administrative capacities. JCOs are responsible for training soldiers, ensuring discipline, and maintaining morale within their units. They act as a vital link between the officers and enlisted personnel, facilitating communication and executing orders. Successful candidates contribute to the overall effectiveness and readiness of the Army, playing a key role in national defense and security.",
    minAge: 18,
    maxAge: 28,
    qualificationRequired: "Graduate",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-01-30",
    applicationEndDate: "2024-02-28",
    imageUrl: "/army-jco.png",
    tag: "defence",
    websiteUrl: "https://joinindianarmy.nic.in",
  },
  {
    id: 10,
    jobTitle: "State Police Constable",
    description:
      "State Police Constables serve as frontline law enforcement officers, responsible for maintaining public order, preventing and investigating crimes, and ensuring community safety. They patrol designated areas, respond to emergencies, and assist in crowd control during events. Constables also gather evidence, conduct interviews, and work closely with local communities to foster trust and cooperation. Successful candidates play a vital role in upholding the law, protecting citizens, and contributing to the overall effectiveness of the police force.",
    minAge: 18,
    maxAge: 27,
    qualificationRequired: "12th Pass",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-11-10",
    applicationEndDate: "2024-12-10",
    imageUrl: "/police-constable.png",
    tag: "law enforcement",
    websiteUrl: "https://statepolice.gov.in",
  },
  {
    id: 11,
    jobTitle: "Indian Postal Service",
    description:
      "The Indian Postal Service offers a range of services, including mail delivery, logistics, and financial services. Postal Service employees are responsible for ensuring the efficient and timely delivery of letters and parcels, managing post offices, and providing customer service. They also facilitate money transfers, savings accounts, and various government services. Successful candidates play a crucial role in connecting communities, enhancing communication, and contributing to the socio-economic development of the country through reliable postal services.",
    minAge: 18,
    maxAge: 30,
    qualificationRequired: "10th Pass",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-06-25",
    applicationEndDate: "2024-07-25",
    imageUrl: "/postal-service.png",
    tag: "nothing",
    websiteUrl: "https://indiapost.gov.in",
  },
  {
    id: 12,
    jobTitle: "Indian Forest Service (IFS)",
    description:
      "The Indian Forest Service (IFS) is responsible for the management and conservation of India’s forests and wildlife. IFS officers oversee forest resources, implement conservation policies, and ensure sustainable management of forest areas. They work on environmental protection, biodiversity conservation, and climate change initiatives. Successful candidates engage with local communities, promote afforestation, and combat illegal activities such as poaching and deforestation, playing a vital role in preserving India's ecological balance and natural heritage.",
    minAge: 21,
    maxAge: 32,
    qualificationRequired: "Graduate in Forestry",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-04-10",
    applicationEndDate: "2024-05-10",
    imageUrl: "/ifs.png",
    tag: "new",
    websiteUrl: "https://upsc.gov.in",
  },
  {
    id: 13,
    jobTitle: "BHEL Engineer Trainee",
    description:
      "BHEL Engineer Trainees undergo rigorous training to develop expertise in various engineering domains, including design, production, and project management. They participate in hands-on projects, gaining practical knowledge in power generation, manufacturing processes, and quality control. Trainees work under experienced professionals, contributing to the development of innovative solutions and optimizing operations. Successful candidates play a key role in enhancing BHEL’s capabilities in the energy sector, supporting India’s infrastructure and sustainable development initiatives.",
    minAge: 21,
    maxAge: 30,
    qualificationRequired: "Engineering Graduate",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-09-05",
    applicationEndDate: "2024-10-05",
    imageUrl: "/bhel.png",
    tag: "engineering",
    websiteUrl: "https://bhel.com",
  },
  {
    id: 14,
    jobTitle: "DRDO Scientist B",
    description:
      "The DRDO Scientist B position involves conducting advanced research and development in defense technologies, focusing on areas such as aerospace, electronics, and missile systems. Scientists are responsible for designing, testing, and evaluating prototypes, ensuring they meet specified requirements. They collaborate with multidisciplinary teams to innovate and enhance defense capabilities. Successful candidates contribute to national security by developing cutting-edge technologies and supporting India's strategic defense initiatives, ultimately playing a vital role in safeguarding the nation.",
    minAge: 21,
    maxAge: 35,
    qualificationRequired: "Engineering Graduate",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-07-01",
    applicationEndDate: "2024-08-01",
    imageUrl: "/drdo.png",
    tag: "science",
    websiteUrl: "https://drdo.gov.in",
  },
  {
    id: 15,
    jobTitle: "UPSC Civil Services",
    description:
      "The UPSC Civil Services examination is a prestigious competitive exam conducted by the Union Public Service Commission for recruitment into various civil services of the Government of India. Candidates are tested on their knowledge, analytical skills, and decision-making abilities across multiple subjects. Successful candidates can join services such as IAS, IPS, and IFS, playing a crucial role in governance, policy formulation, and public administration, making significant contributions to the nation's development.",
    minAge: 18,
    maxAge: 32,
    qualificationRequired: "Graduate",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-09-24",
    applicationEndDate: "2024-10-24",
    imageUrl: "/upsc.png",
    tag: "new",
    websiteUrl: "https://upsc.com",
  },

  {
    id: 16,
    jobTitle: "BSNL JTO",
    description:
      "The BSNL JTO (Junior Telecom Officer) position involves managing and maintaining telecommunication networks and services. JTOs are responsible for troubleshooting technical issues, ensuring optimal network performance, and implementing new technologies. They conduct site surveys, oversee installation and maintenance of equipment, and support customer service initiatives. Successful candidates play a crucial role in enhancing communication infrastructure, ensuring reliable connectivity, and contributing to the overall efficiency of BSNL’s operations in the telecommunications sector.",
    minAge: 20,
    maxAge: 30,
    qualificationRequired: "Engineering Graduate",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-03-01",
    applicationEndDate: "2024-04-01",
    imageUrl: "/bsnl.png",
    tag: "telecom",
    websiteUrl: "https://bsnl.co.in",
  },
  {
    id: 17,
    jobTitle: "Indian Oil Officer",
    description:
      "Indian Oil Officers are responsible for managing operations in various sectors, including refining, marketing, and distribution of petroleum products. They oversee production processes, ensure compliance with safety and environmental regulations, and implement efficiency improvements. Officers collaborate with cross-functional teams to optimize supply chain management and enhance customer service. Successful candidates contribute to the growth of Indian Oil by driving innovation, ensuring quality standards, and supporting sustainable practices in the energy sector.",
    minAge: 21,
    maxAge: 30,
    qualificationRequired: "Graduate",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-07-12",
    applicationEndDate: "2024-08-12",
    imageUrl: "/indian-oil.png",
    tag: "oil",
    websiteUrl: "https://iocl.com",
  },
  {
    id: 18,
    jobTitle: "ESIC UDC",
    description:
      "The ESIC UDC (Upper Division Clerk) position involves performing administrative and clerical duties in the Employees' State Insurance Corporation. UDCs are responsible for managing records, processing claims, and assisting with the implementation of social security schemes. They ensure accurate data entry, maintain efficient communication with beneficiaries, and support the overall functioning of the office. Successful candidates play a vital role in enhancing service delivery and contributing to the effective administration of employee welfare programs.",
    minAge: 18,
    maxAge: 27,
    qualificationRequired: "Graduate",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-06-20",
    applicationEndDate: "2024-07-20",
    imageUrl: "/esic-udc.png",
    tag: "health",
    websiteUrl: "https://esic.nic.in",
  },
  {
    id: 19,
    jobTitle: "FCI Manager",
    description:
      "The FCI Manager (Food Corporation of India) oversees operations related to the procurement, storage, and distribution of food grains and other essential commodities. Managers are responsible for planning and implementing strategies to enhance efficiency and ensure food security. They coordinate with various departments, manage staff, and ensure compliance with government regulations. Successful candidates play a crucial role in maintaining the supply chain, optimizing logistics, and contributing to the effective functioning of India’s food distribution network.",
    minAge: 21,
    maxAge: 28,
    qualificationRequired: "Graduate",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-05-18",
    applicationEndDate: "2024-06-18",
    imageUrl: "/fci-manager.png",
    tag: "food",
    websiteUrl: "https://fci.gov.in",
  },
  {
    id: 20,
    jobTitle: "LIC AAO",
    description:
      "The LIC AAO (Assistant Administrative Officer) is responsible for managing various administrative functions within the Life Insurance Corporation of India. AAOs handle customer queries, process insurance applications, and assess claims. They also assist in policy marketing, promoting financial products, and providing guidance to clients. Successful candidates play a vital role in enhancing customer satisfaction, ensuring compliance with regulatory standards, and contributing to the overall growth and efficiency of LIC's operations in the insurance sector.",
    minAge: 21,
    maxAge: 30,
    qualificationRequired: "Graduate",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-03-10",
    applicationEndDate: "2024-04-10",
    imageUrl: "/lic-aao.png",
    tag: "insurance",
    websiteUrl: "https://licindia.in",
  },
  {
    id: 21,
    jobTitle: "EPFO Assistant",
    description:
      "The EPFO Assistant (Employees' Provident Fund Organisation) plays a crucial role in managing and processing employee provident fund accounts and claims. Assistants are responsible for maintaining accurate records, addressing member queries, and ensuring timely disbursement of benefits. They assist in the implementation of policies and procedures related to provident fund schemes, promoting awareness among members. Successful candidates contribute to enhancing service delivery, ensuring compliance with regulations, and supporting the overall efficiency of EPFO operations.",
    minAge: 21,
    maxAge: 27,
    qualificationRequired: "Graduate",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-02-08",
    applicationEndDate: "2024-03-08",
    imageUrl: "/epfo.png",
    tag: "pension",
    websiteUrl: "https://epfindia.gov.in",
  },
  {
    id: 22,
    jobTitle: "SBI Clerk",
    description:
      "SBI Clerks are responsible for performing various administrative and customer service functions within the State Bank of India. They handle account management, process transactions, and assist customers with inquiries regarding banking services. Clerks also maintain accurate records, promote banking products, and ensure compliance with regulatory standards. Successful candidates play a vital role in enhancing customer satisfaction, streamlining operations, and contributing to the overall efficiency and effectiveness of the bank’s services.",
    minAge: 20,
    maxAge: 28,
    qualificationRequired: "Graduate",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-08-01",
    applicationEndDate: "2024-09-01",
    imageUrl: "/sbi-clerk.png",
    tag: "banking",
    websiteUrl: "https://sbi.co.in",
  },
  {
    id: 23,
    jobTitle: "IB ACIO",
    description:
      "The IB ACIO (Intelligence Bureau Assistant Central Intelligence Officer) position involves intelligence gathering, analysis, and investigation in matters related to national security. ACIOs conduct surveillance, collect information, and assist in various operations to counter threats. They also engage in data analysis and report writing to support decision-making processes. Successful candidates play a crucial role in safeguarding national interests, enhancing intelligence capabilities, and contributing to the overall effectiveness of India’s internal security framework.",
    minAge: 18,
    maxAge: 27,
    qualificationRequired: "Graduate",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-12-10",
    applicationEndDate: "2025-01-10",
    imageUrl: "/ib-acio.png",
    tag: "intelligence",
    websiteUrl: "https://mha.gov.in",
  },
  {
    id: 24,
    jobTitle: "RBI Assistant",
    description:
      "The RBI Assistant position involves providing vital administrative support within the Reserve Bank of India. Assistants handle customer queries, manage records, and assist with data entry and processing transactions. They play a key role in maintaining effective communication between the bank and its clients, ensuring compliance with banking regulations. Successful candidates contribute to the smooth functioning of various departments, enhancing service delivery, and supporting the overall mission of the RBI in maintaining monetary stability.",
    minAge: 20,
    maxAge: 28,
    qualificationRequired: "Graduate",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-04-25",
    applicationEndDate: "2024-05-25",
    imageUrl: "/rbi-assistant.png",
    tag: "banking",
    websiteUrl: "https://rbi.org.in",
  },
  {
    id: 25,
    jobTitle: "Indian Air Force Group X",
    description:
      "The Indian Air Force Group X personnel are responsible for technical roles that involve the maintenance and operation of aircraft systems and equipment. They work in various fields such as avionics, mechanical, and electrical systems, ensuring the airworthiness of aircraft. Group X personnel undergo rigorous training to develop specialized skills and contribute to mission readiness. Successful candidates play a crucial role in supporting aerial operations and maintaining the operational efficiency of the Indian Air Force.",
    minAge: 18,
    maxAge: 24,
    qualificationRequired: "12th Pass",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-01-20",
    applicationEndDate: "2024-02-20",
    imageUrl: "/indian-air.png",
    tag: "new",
    websiteUrl: "https://indianairforce.nic.in",
  },
  {
    id: 26,
    jobTitle: "Indian Air Force Group Y",
    description:
      "Indian Air Force Group Y personnel serve in various non-technical roles that support the operational and administrative functions of the Air Force. They are involved in areas such as logistics, medical assistance, and ground support services. Group Y members ensure the smooth running of operations by managing supplies, maintaining records, and providing essential services to personnel. Successful candidates contribute significantly to the efficiency and effectiveness of the Indian Air Force’s overall mission.",
    minAge: 18,
    maxAge: 24,
    qualificationRequired: "12th Pass",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-02-22",
    applicationEndDate: "2024-03-22",
    imageUrl: "/airforce-y.png",
    tag: "defence",
    websiteUrl: "https://indianairforce.nic.in",
  },
  {
    id: 27,
    jobTitle: "SSC CHSL",
    description:
      "The SSC CHSL (Staff Selection Commission Combined Higher Secondary Level) examination recruits candidates for various clerical and administrative positions in government departments. Successful candidates handle tasks such as data entry, record maintenance, and customer service. They assist in the implementation of policies and procedures, ensuring efficient operations. With a focus on accuracy and attention to detail, CHSL recruits play a vital role in supporting public service delivery and enhancing the effectiveness of government functions.",
    minAge: 18,
    maxAge: 27,
    qualificationRequired: "12th Pass",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-06-10",
    applicationEndDate: "2024-07-10",
    imageUrl: "/ssc-chsl.png",
    tag: "clerical",
    websiteUrl: "https://ssc.nic.in",
  },
  {
    id: 28,
    jobTitle: "CISF Constable",
    description:
      "The CISF Constable position involves maintaining security and order at various installations, including airports, railways, and industrial sites. Constables are responsible for conducting patrols, monitoring access control, and ensuring the safety of personnel and property. They assist in crowd management during events and respond to emergencies. Successful candidates play a crucial role in protecting critical infrastructure, supporting national security efforts, and fostering a safe environment for the public and employees.",
    minAge: 18,
    maxAge: 23,
    qualificationRequired: "10th Pass",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-12-01",
    applicationEndDate: "2025-01-01",
    imageUrl: "/cisf-constable.png",
    tag: "police",
    websiteUrl: "https://cisf.gov.in",
  },
  {
    id: 29,
    jobTitle: "SSC Stenographer",
    description:
      "The SSC Stenographer position involves providing secretarial support in various government departments by transcribing spoken words into written text. Stenographers are responsible for taking dictations, preparing official documents, and maintaining records. They also assist in administrative tasks, ensuring smooth communication and documentation processes. Successful candidates must possess excellent typing and shorthand skills, contributing significantly to the efficiency of office operations and facilitating effective communication within the organization.",
    minAge: 18,
    maxAge: 30,
    qualificationRequired: "12th Pass",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-07-15",
    applicationEndDate: "2024-08-15",
    imageUrl: "/ssc-steno.png",
    tag: "clerical",
    websiteUrl: "https://ssc.nic.in",
  },
  {
    id: 30,
    jobTitle: "CRPF Constable",
    description:
      "The CRPF Constable position involves maintaining law and order, ensuring internal security, and supporting counter-insurgency operations in various regions. Constables conduct patrols, assist in crowd management, and respond to emergencies, providing essential support during critical situations. They are trained to handle various law enforcement duties and work closely with local communities to foster trust and cooperation. Successful candidates play a vital role in safeguarding public safety and contributing to the overall security of the nation.",
    minAge: 18,
    maxAge: 23,
    qualificationRequired: "10th Pass",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-05-20",
    applicationEndDate: "2024-06-20",
    imageUrl: "/crpf-constable.png",
    tag: "police",
    websiteUrl: "https://crpf.gov.in",
  },
  {
    id: 31,
    jobTitle: "SSC JE",
    description:
      "The SSC JE (Junior Engineer) position involves assisting in the planning, design, and execution of engineering projects within government departments. Junior Engineers are responsible for conducting site inspections, preparing technical reports, and ensuring compliance with safety and quality standards. They collaborate with senior engineers and other professionals to implement projects effectively. Successful candidates play a crucial role in enhancing infrastructure development, ensuring efficient resource management, and contributing to the overall progress of government initiatives.",
    minAge: 20,
    maxAge: 30,
    qualificationRequired: "Engineering Graduate",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-09-01",
    applicationEndDate: "2024-10-01",
    imageUrl: "/ssc-je.png",
    tag: "engineering",
    websiteUrl: "https://ssc.nic.in",
  },
  {
    id: 32,
    jobTitle: "BSF Head Constable",
    description:
      "The BSF (Border Security Force) Head Constable position involves managing and supervising the activities of constables in maintaining border security and internal law enforcement. Head Constables are responsible for conducting patrols, monitoring border areas, and coordinating operations during emergencies. They assist in training new recruits and ensuring compliance with regulations. Successful candidates play a crucial role in enhancing the effectiveness of security operations, ensuring the safety of borders, and supporting national integrity.",
    minAge: 18,
    maxAge: 25,
    qualificationRequired: "12th Pass",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-09-25",
    applicationEndDate: "2024-10-25",
    imageUrl: "/bsf-constable.png",
    tag: "police",
    websiteUrl: "https://bsf.nic.in",
  },
  {
    id: 33,
    jobTitle: "NTPC Executive Trainee",
    description:
      "The NTPC Executive Trainee position involves participating in comprehensive training programs to develop skills in various aspects of power generation and management. Trainees engage in hands-on projects, learn about operational processes, and gain insights into technology and project management. They work alongside experienced professionals to contribute to efficiency improvements and innovative solutions. Successful candidates play a vital role in enhancing NTPC’s capabilities in the energy sector, supporting sustainable growth and national energy security.",
    minAge: 21,
    maxAge: 27,
    qualificationRequired: "Graduate",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-03-15",
    applicationEndDate: "2024-04-15",
    imageUrl: "/ntpc-trainee.png",
    tag: "energy",
    websiteUrl: "https://ntpc.co.in",
  },
  {
    id: 34,
    jobTitle: "NHPC Trainee Engineer",
    description:
      "The NHPC Trainee Engineer position involves undergoing intensive training to develop expertise in hydroelectric power generation and project management. Trainees engage in hands-on learning, working on various engineering aspects such as design, operation, and maintenance of hydroelectric plants. They collaborate with experienced engineers to implement innovative solutions and optimize processes. Successful candidates contribute to NHPC’s mission of sustainable energy development, playing a crucial role in enhancing India’s renewable energy infrastructure and capacity.",
    minAge: 21,
    maxAge: 30,
    qualificationRequired: "Engineering Graduate",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-10-20",
    applicationEndDate: "2024-11-20",
    imageUrl: "/nhpc-trainee.png",
    tag: "engineering",
    websiteUrl: "https://nhpcindia.com",
  },
  {
    id: 35,
    jobTitle: "UPPCL Technician",
    description:
      "The UPPCL Technician position involves performing technical tasks related to the operation, maintenance, and repair of electrical systems and equipment within the Uttar Pradesh Power Corporation Limited. Technicians are responsible for ensuring the efficient functioning of power distribution networks, conducting inspections, and troubleshooting faults. They assist in installing and maintaining electrical infrastructure, adhering to safety regulations. Successful candidates play a vital role in providing reliable electricity supply and supporting the overall efficiency of UPPCL's operations.",
    minAge: 18,
    maxAge: 28,
    qualificationRequired: "10th Pass + ITI",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-08-05",
    applicationEndDate: "2024-09-05",
    imageUrl: "/uppcl-technician.png",
    tag: "energy",
    websiteUrl: "https://uppcl.org",
  },
  {
    id: 36,
    jobTitle: "Delhi Metro Rail Corporation (DMRC)",
    description:
      "The Delhi Metro Rail Corporation (DMRC) offers various positions, including roles in engineering, operations, and administration. Employees are responsible for the planning, construction, and maintenance of the metro rail network, ensuring safe and efficient transportation for commuters. They work on projects involving civil engineering, electrical systems, signaling, and customer service. Successful candidates contribute to the expansion and modernization of urban transport, enhancing connectivity and sustainability in Delhi's public transportation system.",
    minAge: 18,
    maxAge: 28,
    qualificationRequired: "12th Pass",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-05-01",
    applicationEndDate: "2024-06-01",
    imageUrl: "/dmrc.png",
    tag: "metro",
    websiteUrl: "https://delhimetrorail.com",
  },
  {
    id: 37,
    jobTitle: "RRB ALP",
    description:
      "The RRB ALP (Assistant Loco Pilot) position involves assisting in the operation and maintenance of locomotives and trains. ALPs are responsible for ensuring the safe and efficient running of trains, conducting pre-departure checks, and responding to operational issues during journeys. They work closely with the Loco Pilot and other railway staff to maintain schedules and ensure passenger safety. Successful candidates play a crucial role in the Indian Railways, contributing to reliable and efficient rail transport services.",
    minAge: 18,
    maxAge: 30,
    qualificationRequired: "10th Pass",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-04-15",
    applicationEndDate: "2024-05-15",
    imageUrl: "/rrb-alp.png",
    tag: "railway",
    websiteUrl: "https://indianrailways.gov.in",
  },
  {
    id: 38,
    jobTitle: "UPSC Engineering Services",
    description:
      "The UPSC Engineering Services examination recruits candidates for various engineering roles in the Indian government. Successful candidates work in diverse sectors, including civil, mechanical, electrical, and electronics engineering. They are responsible for designing, implementing, and managing projects related to infrastructure development, public works, and technical services. Engineering Services officers ensure compliance with standards, conduct site inspections, and oversee operations. Their contributions are vital for national development and the effective functioning of government projects and initiatives.",
    minAge: 21,
    maxAge: 30,
    qualificationRequired: "Engineering Graduate",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-03-25",
    applicationEndDate: "2024-04-25",
    imageUrl: "/upsc-es.png",
    tag: "engineering",
    websiteUrl: "https://upsc.gov.in",
  },
  {
    id: 39,
    jobTitle: "SSC GD Constable",
    description:
      "The SSC GD Constable position involves performing duties related to maintaining law and order, ensuring security, and assisting in various law enforcement activities. GD Constables are responsible for patrolling designated areas, managing crowd control, and responding to emergencies. They gather intelligence, assist in investigations, and collaborate with other security agencies. Successful candidates play a crucial role in enhancing public safety, supporting the police force, and contributing to the overall security framework of the country.",
    minAge: 18,
    maxAge: 23,
    qualificationRequired: "10th Pass",
    categories: ["sc", "st", "obc", "general", "pwd"],
    applicationStartDate: "2024-04-01",
    applicationEndDate: "2024-05-01",
    imageUrl: "/ssc-gd.png",
    tag: "police",
    websiteUrl: "https://ssc.nic.in",
  },
];

const JobPage = () => {
  const { jobId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [age, setAge] = useState("");
  const [education, setEducation] = useState("");
  const [category, setCategory] = useState("");
  const [eligibilityChecked, setEligibilityChecked] = useState(false);
  const [isEligible, setIsEligible] = useState(false); // State to track eligibility

  const job = examsData.find((item) => item.id === parseInt(jobId, 10));

  if (!job) {
    return <p>Job not found.</p>;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const checkEligibility = () => {
    if (!age || !education || !category) return false;

    const ageNumber = Number(age);

    const isAgeEligible = ageNumber >= job.minAge && ageNumber <= job.maxAge;
    const isEducationEligible =
      job.qualificationRequired.toLowerCase() === education.toLowerCase();
    const isCategoryEligible = job.category
      .map((cat) => cat.toLowerCase())
      .includes(category.toLowerCase());

    return isAgeEligible && isEducationEligible && isCategoryEligible;
  };

  const handleEligibilitySubmit = (e) => {
    e.preventDefault();
    setEligibilityChecked(true);
    // Set eligibility state based on the check
    setIsEligible(checkEligibility());
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
  };

  return (
    <div className="jobPage">
      <button className="home-icon" onClick={toggleSidebar}>
        {sidebarOpen ? "×" : "☰"}
      </button>

      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="form-container">
          <h5>Check Your Eligibility</h5>
          <form onSubmit={handleEligibilitySubmit}>
            <div>
              <label>Enter your age:</label>
              <input
                type="number"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div>
              <label>Select your education:</label>
              <select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              >
                <option value="">Select Education</option>
                <option value="10th">10th</option>
                <option value="12th ">12th</option>
                <option value="Graduate">Graduate</option>
                <option value="Post Graduate">Post Graduate</option>
              </select>
            </div>
            <div>
              <label>Select your category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="OBC">OBC</option>
                <option value="General">General</option>
              </select>
            </div>
            <button type="submit">Check Eligibility</button>
            {eligibilityChecked && (
              <>
                {isEligible ? (
                  <p className="not-eligible">You are eligible for this job!</p>
                ) : (
                  <p className="eligible">You are not eligible for this job.</p>
                )}
              </>
            )}
          </form>
        </div>
      </div>

      <div className="jobContentContainer">
        <div className="ContentContainer">
          <div className="job-title">
            <h1>Name Of Job:</h1>
            <h1 className="color">{job.jobTitle}</h1>
          </div>
          <div className="job-description">
            <p className="description-title">Job Description</p>
            <span>:</span>
            <p>{job.description}</p>
          </div>
          <div className="applicationDate">
            <p>Application Starts</p>
            <span>:</span>
            <p>{formatDate(job.applicationStartDate)}</p>
          </div>
          <div className="endingDate">
            <p>Application Last Date</p>
            <span>:</span>
            <p>{formatDate(job.applicationEndDate)}</p>
          </div>
          <div className="qualification">
            <p>Required Qualification</p>
            <span>:</span>
            <p>{job.qualificationRequired}</p>
          </div>
        </div>

        <hr />

        <div className="age-container">
          <h2>Required Age Limit</h2>
          <ul>
            <li>
              <div>
                <p>Minimum Age</p>
                <span>:</span>
                <p>{job.minAge}</p>
              </div>
            </li>
            <li>
              <div className="max-age">
                <p>Maximum Age</p>
                <span>:</span>
                <p>{job.maxAge}</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="myButton">
          <a href={job.websiteUrl} target="_blank" rel="noopener noreferrer">
            <button className="button">
              <p>Apply Now</p>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
