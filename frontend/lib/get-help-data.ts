/**
 * Data for the Get Help emergency directory (/get-help).
 *
 * GENERATED FILE — do not edit by hand. Update the research JSON in
 * `docs/get-help/` and run `node scripts/generate-get-help-data.mjs`.
 * Per-entry sources and verification notes live in `docs/get-help/SOURCES.md`.
 */
import type { HelpRegion, HelpService } from './get-help'

/** Shown in the page footer so readers know how fresh the numbers are. */
export const HELP_VERIFIED_DATE = 'August 2026'

/**
 * 24/7 crisis and victim-support hotlines (national + statewide).
 * Rendered in the "Call or text now" section.
 */
export const HELP_HOTLINES: HelpService[] = [
  {
    category: 'dv-sa',
    name: 'StrongHearts Native Helpline',
    description:
      '24/7 confidential helpline by and for Native Americans and Alaska Natives affected by domestic, dating, and sexual violence.',
    phones: [
      {
        label: 'Call or text, 24/7',
        number: '1-844-762-8483',
      },
    ],
    text: 'Text START to 1-844-762-8483, or chat via strongheartshelpline.org',
    website: 'https://strongheartshelpline.org/',
    hours: '24/7',
    native: true,
  },
  {
    category: 'crisis-hotlines',
    name: '988 Suicide & Crisis Lifeline',
    description:
      'Free, confidential support for anyone in suicidal crisis or emotional distress, and for people worried about a loved one.',
    phones: [
      {
        label: 'Call or text, 24/7',
        number: '988',
      },
    ],
    text: 'Text 988, or chat at chat.988lifeline.org (Spanish, LGBTQI+, and Deaf/HoH options available)',
    website: 'https://988lifeline.org/',
    hours: '24/7',
  },
  {
    category: 'dv-sa',
    name: 'National Domestic Violence Hotline',
    description:
      '24/7 confidential support, safety planning, and local referrals for anyone experiencing domestic violence or abuse.',
    phones: [
      {
        label: 'Call, 24/7',
        number: '1-800-799-7233',
      },
      {
        label: 'Deaf/HoH videophone',
        number: '1-855-812-1001',
      },
    ],
    text: 'Text START to 88788, or chat at thehotline.org',
    website: 'https://www.thehotline.org/',
    hours: '24/7',
  },
  {
    category: 'dv-sa',
    name: 'RAINN National Sexual Assault Hotline',
    description:
      'Free, confidential 24/7 support for survivors of sexual assault and their loved ones, in English and Spanish.',
    phones: [
      {
        label: 'Call, 24/7',
        number: '1-800-656-4673',
      },
    ],
    text: 'Text HOPE to 64673, or chat at rainn.org/hotline (Signal messaging also available)',
    website: 'https://rainn.org/',
    hours: '24/7',
  },
  {
    category: 'dv-sa',
    name: 'National Human Trafficking Hotline',
    description:
      '24/7 confidential help and tip line for victims and survivors of sex or labor trafficking, and for reporting suspected trafficking.',
    phones: [
      {
        label: 'Call, 24/7 (TTY 711)',
        number: '1-888-373-7888',
      },
    ],
    text: 'Text 233733, or chat at humantraffickinghotline.org',
    website: 'https://humantraffickinghotline.org/',
    hours: '24/7',
  },
  {
    category: 'crisis-hotlines',
    name: 'Crisis Text Line',
    description:
      'Free 24/7 text-based support with a trained crisis counselor for any kind of crisis.',
    phones: [],
    text: 'Text HOME to 741741 (HOLA for Spanish); WhatsApp 1-443-787-7678; chat at connect.crisistextline.org',
    website: 'https://www.crisistextline.org/',
    hours: '24/7',
  },
  {
    category: 'crisis-hotlines',
    name: '211 California',
    description:
      'Free, confidential referrals to local food, housing, health, mental health, and crisis services anywhere in California.',
    phones: [
      {
        label: 'Dial 2-1-1',
        number: '211',
      },
      {
        label: 'Outside your home county',
        number: '1-866-346-3211',
      },
    ],
    text: 'Text your ZIP code to 898211 (where available)',
    website: 'https://211ca.org/',
    hours: '24/7 in most counties (13 rural counties lack full 24/7 service)',
  },
]

/**
 * Where to report and escalate a missing-person case.
 * Rendered in the "If someone you love is missing" section.
 */
export const HELP_MISSING_PERSON_RESOURCES: HelpService[] = [
  {
    category: 'missing-persons',
    name: 'California DOJ Missing Persons Section',
    description:
      "The state's missing persons clearinghouse — searchable database, free DNA program for families, and confirmation that there is NO waiting period to report someone missing in California (missing.persons@doj.ca.gov).",
    phones: [
      {
        label: 'Missing Children Clearinghouse (1-800-222-FIND)',
        number: '1-800-222-3463',
      },
    ],
    website: 'https://oag.ca.gov/missing',
  },
  {
    category: 'missing-persons',
    name: 'NamUs (National Missing & Unidentified Persons System)',
    description:
      "Free national database where families can enter a missing loved one's case once a police report exists; cases are vetted with the investigating agency, and NamUs provides free forensic services including family DNA kits.",
    phones: [],
    text: 'Create a case or send questions via the web form at namus.nij.ojp.gov/contact (choose Case Support)',
    website: 'https://namus.nij.ojp.gov/',
  },
  {
    category: 'missing-persons',
    name: 'National Center for Missing & Exploited Children (NCMEC)',
    description:
      '24-hour hotline for reporting and finding missing children and teens under 18 — call right after 911.',
    phones: [
      {
        label: '24-hour hotline',
        number: '1-800-843-5678',
      },
    ],
    website: 'https://www.missingkids.org/',
    hours: '24/7',
  },
  {
    category: 'missing-persons',
    name: "Yurok Tribal Court MMIP Program (To' Kee Skuy' Soo Ney-Wo-Chek')",
    description:
      'Tribal MMIP program serving Northern California families — case and tip intake, search assistance, advocacy, accompaniment, and support with reunification costs.',
    phones: [
      {
        label: '877-YT-COURT, ext. 4',
        number: '1-877-982-6878',
      },
    ],
    text: 'Anonymous case and tip forms at yuroktribalcourt.org',
    address: '230 Klamath Blvd. Ste. A, Klamath, CA',
    website: 'https://yuroktribalcourt.org/programs/to-kee-skuy-soo-ney-wo-chek/',
    native: true,
  },
  {
    category: 'law-enforcement',
    name: 'BIA Missing & Murdered Unit (MMU)',
    description:
      'Federal unit that analyzes and helps solve missing and murdered cases involving American Indians and Alaska Natives — families can submit case information or tips by phone, email (OJS_MMU@bia.gov), or online form.',
    phones: [
      {
        label: 'Office line, Mon-Fri 8:30am-4:30pm',
        number: '1-833-560-2065',
      },
    ],
    text: 'Submit a tip or case online at bia.gov/service/mmu/submit-tip-or-case-information',
    website: 'https://www.bia.gov/service/mmu',
    hours: 'Mon-Fri 8:30am-4:30pm (call 911 in an emergency)',
    native: true,
  },
  {
    category: 'law-enforcement',
    name: 'FBI Tips',
    description:
      "Report a federal crime or share information on a missing or murdered loved one's case with the FBI by phone or online.",
    phones: [
      {
        label: '1-800-CALL-FBI',
        number: '1-800-225-5324',
      },
    ],
    text: 'Submit a tip online at tips.fbi.gov',
    website: 'https://www.fbi.gov/tips',
  },
  {
    category: 'law-enforcement',
    name: 'CA DOJ Office of Native American Affairs (ONAA)',
    description:
      "The Attorney General's tribal liaison office — leads the state's MMIP outreach, Missing in California Indian Country events, and tribal community response planning (ONAA@doj.ca.gov).",
    phones: [
      {
        label: 'Office line',
        number: '(916) 210-6474',
      },
    ],
    website: 'https://oag.ca.gov/nativeamerican',
    native: true,
  },
]

/**
 * Statewide programs that help after the first call — compensation,
 * legal aid, referrals. Rendered in the "More statewide support" section.
 */
export const HELP_STATEWIDE_SUPPORT: HelpService[] = [
  {
    category: 'legal-advocacy',
    name: 'California Victim Compensation Board (CalVCB)',
    description:
      'State program that reimburses crime-related expenses for victims and families, such as counseling, medical care, and funeral or burial costs.',
    phones: [
      {
        label: 'Helpline',
        number: '1-800-777-9229',
      },
    ],
    website: 'https://victims.ca.gov/',
  },
  {
    category: 'legal-advocacy',
    name: 'California Tribal Families Coalition (CTFC)',
    description:
      'Statewide coalition of California tribes advocating for the health, safety, and welfare of tribal children and families (contact@caltribalfamilies.org).',
    phones: [
      {
        label: 'Office line',
        number: '(916) 583-8289',
      },
    ],
    website: 'https://caltribalfamilies.org/',
    native: true,
  },
  {
    category: 'legal-advocacy',
    name: 'California Indian Legal Services (CILS)',
    description:
      'Free or low-cost legal help for Native individuals and tribes in every California county, with offices in Escondido, Sacramento, Bishop, and Eureka.',
    phones: [
      {
        label: 'Escondido (Southern)',
        number: '1-800-743-8941',
      },
      {
        label: 'Sacramento (Central)',
        number: '1-800-829-0284',
      },
      {
        label: 'Bishop (Eastern)',
        number: '1-800-736-3582',
      },
      {
        label: 'Eureka (Northern)',
        number: '1-800-347-2402',
      },
    ],
    website: 'https://www.calindian.org/',
    native: true,
  },
  {
    category: 'native-health',
    name: 'California Rural Indian Health Board (CRIHB)',
    description:
      "Statewide network of tribal health programs promoting the health and social conditions of California's Indian people, including domestic violence prevention.",
    phones: [
      {
        label: 'Main office',
        number: '(916) 929-9761',
      },
    ],
    address: '1020 Sundown Way, Roseville, CA 95661',
    website: 'https://crihb.org/',
    native: true,
  },
  {
    category: 'native-health',
    name: 'California Consortium for Urban Indian Health (CCUIH)',
    description:
      'Statewide association of ten urban Indian health programs offering culturally centered care, with violence-prevention work through its Red Women Rising program.',
    phones: [
      {
        label: 'Main office',
        number: '(916) 285-5824',
      },
    ],
    address: '1900 Point West Way, Ste. 111, Sacramento, CA 95815',
    website: 'https://ccuih.org/',
    native: true,
  },
]

/** The regional directory: Northern, Central and Southern California. */
export const HELP_REGIONS: HelpRegion[] = [
  {
    id: 'north',
    name: 'Northern California',
    description: 'Sacramento, the Bay Area, and the North Coast tribal lands',
    cities: [
      {
        name: 'Sacramento',
        slug: 'sacramento',
        county: 'Sacramento County',
        services: [
          {
            category: 'law-enforcement',
            name: 'Sacramento Police Department',
            description:
              'City police for Sacramento; call the non-emergency dispatch line to reach an officer or report a crime that is not in progress.',
            phones: [
              {
                label: 'Non-emergency',
                number: '(916) 808-5471',
              },
            ],
            address: '5770 Freeport Blvd, Sacramento, CA 95822',
            website: 'https://www.cityofsacramento.gov/police',
          },
          {
            category: 'missing-persons',
            name: 'Sacramento Police Department - Missing Persons Unit',
            description:
              'SPD investigations unit that handles missing person cases; there is no waiting period to report someone missing.',
            phones: [
              {
                label: 'Missing Persons Unit',
                number: '(916) 808-0560',
              },
              {
                label: 'Non-emergency (to file a report)',
                number: '(916) 808-5471',
              },
            ],
            address: '5770 Freeport Blvd, Sacramento, CA 95822',
            website: 'https://www.cityofsacramento.gov/police',
          },
          {
            category: 'law-enforcement',
            name: "Sacramento County Sheriff's Office",
            description:
              'County sheriff serving unincorporated Sacramento County; call the non-emergency line for reports and assistance outside city limits.',
            phones: [
              {
                label: 'Non-emergency',
                number: '(916) 874-5115',
              },
            ],
            address: '4500 Orange Grove Ave, Sacramento, CA 95841',
            website: 'https://www.sacsheriff.com/',
          },
          {
            category: 'law-enforcement',
            name: 'FBI Sacramento Field Office',
            description:
              'Federal field office covering the Eastern District of California (including Sacramento); takes reports of suspicious activity and crime 24/7 and works missing person and MMIP cases on federal and tribal lands.',
            phones: [
              {
                label: 'Main (24/7)',
                number: '(916) 746-7000',
              },
            ],
            address: '2001 Freedom Way, Roseville, CA 95678',
            website: 'https://www.fbi.gov/contact-us/field-offices/sacramento',
            hours: '24/7',
          },
          {
            category: 'native-health',
            name: 'Sacramento Native American Health Center',
            description:
              'Urban Indian health center offering medical, dental, behavioral health, and traditional healing services to the Native community and others.',
            phones: [
              {
                label: 'Main',
                number: '(916) 341-0575',
              },
            ],
            address: '2020 J Street, Sacramento, CA 95811',
            website: 'https://www.snahc.org/',
            native: true,
          },
          {
            category: 'dv-sa',
            name: 'WEAVE',
            description:
              "Sacramento County's primary crisis service for survivors of domestic violence and sexual assault, with a 24/7 support and information line staffed by trained peer counselors.",
            phones: [
              {
                label: '24/7 support line',
                number: '(916) 920-2952',
              },
              {
                label: 'Business line',
                number: '(916) 448-2321',
              },
            ],
            address: '1900 K Street, Sacramento, CA 95811',
            website: 'https://www.weaveinc.org/',
            hours: '24/7',
          },
          {
            category: 'legal-advocacy',
            name: 'California Indian Legal Services - Sacramento (Central Office)',
            description:
              'Nonprofit law firm protecting Indian rights; provides legal help to Native individuals and tribes across central California, including family, ICWA, and victim-rights matters.',
            phones: [
              {
                label: 'Main office',
                number: '(916) 978-0960',
              },
              {
                label: 'Toll-free',
                number: '1-800-829-0284',
              },
            ],
            address: '106 K Street, Suite 300, Sacramento, CA 95814',
            website: 'https://www.calindian.org/',
            native: true,
          },
          {
            category: 'legal-advocacy',
            name: 'Sacramento County DA Victim/Witness Assistance Program',
            description:
              'District Attorney program offering crisis intervention, court accompaniment, advocacy, and help applying for state victim compensation; the line is monitored daily.',
            phones: [
              {
                label: 'Victim/Witness line',
                number: '(916) 874-5701',
              },
            ],
            website: 'https://www.sacda.org/victim-services/victim-witness-assistance-program/',
          },
        ],
      },
      {
        name: 'San Francisco',
        slug: 'san-francisco',
        county: 'San Francisco County',
        services: [
          {
            category: 'law-enforcement',
            name: 'San Francisco Police Department',
            description:
              'City police for San Francisco; use the non-emergency line for situations that need police but not an immediate response.',
            phones: [
              {
                label: 'Non-emergency',
                number: '(415) 553-0123',
              },
              {
                label: 'Headquarters',
                number: '(415) 837-7000',
              },
            ],
            address: '1245 3rd Street, San Francisco, CA 94158',
            website: 'https://www.sanfranciscopolice.org/',
          },
          {
            category: 'missing-persons',
            name: 'SFPD Missing Persons Unit',
            description:
              'Dedicated SFPD unit for missing person cases; you can report a missing person right away, with no waiting period.',
            phones: [
              {
                label: 'Missing Persons',
                number: '(415) 734-3070',
              },
            ],
            address: '1245 3rd Street, San Francisco, CA 94158',
            website: 'https://www.sanfranciscopolice.org/get-service/police-reports/missing-person',
          },
          {
            category: 'law-enforcement',
            name: "San Francisco Sheriff's Office",
            description:
              'County sheriff for the City and County of San Francisco; handles jails, civil process, and court and building security.',
            phones: [
              {
                label: 'Main office',
                number: '(415) 554-7225',
              },
            ],
            address:
              'City Hall, Room 456, 1 Dr. Carlton B. Goodlett Place, San Francisco, CA 94102',
            website: 'https://www.sfsheriff.com/',
            hours: 'Mon-Fri 8:00am-5:00pm',
          },
          {
            category: 'law-enforcement',
            name: 'FBI San Francisco Field Office',
            description:
              'Federal field office covering 15 northern California counties including San Francisco; takes reports of suspicious activity and crime 24/7 and assists on missing person and MMIP cases.',
            phones: [
              {
                label: 'Main (24/7)',
                number: '(415) 553-7400',
              },
            ],
            address: '450 Golden Gate Avenue, 13th Floor, San Francisco, CA 94102',
            website: 'https://www.fbi.gov/contact-us/field-offices/sanfrancisco',
            hours: '24/7',
          },
          {
            category: 'native-health',
            name: 'Native American Health Center - San Francisco',
            description:
              'Community health center serving the urban Native community with medical, dental, behavioral health, and community wellness services.',
            phones: [
              {
                label: 'Medical',
                number: '(415) 417-3501',
              },
              {
                label: 'Behavioral health',
                number: '(415) 417-3503',
              },
            ],
            address: '160 Capp St., San Francisco, CA 94110',
            website: 'https://www.nativehealth.org/',
            native: true,
          },
          {
            category: 'dv-sa',
            name: 'La Casa de las Madres',
            description:
              'San Francisco domestic violence agency with 24/7 hotlines, emergency shelter, and drop-in support for adults and teens.',
            phones: [
              {
                label: '24/7 adult hotline',
                number: '1-877-503-1850',
              },
              {
                label: '24/7 teen hotline',
                number: '1-877-923-0700',
              },
              {
                label: 'Text line',
                number: '(415) 200-3575',
              },
            ],
            address: '1269 Howard Street, San Francisco, CA 94103',
            website: 'https://www.lacasa.org/',
            hours: '24/7',
          },
          {
            category: 'dv-sa',
            name: 'San Francisco Women Against Rape',
            description:
              'Rape crisis center offering a 24-hour hotline, counseling, accompaniment to hospitals and police, and advocacy for sexual assault survivors.',
            phones: [
              {
                label: '24-hour hotline',
                number: '(415) 647-7273',
              },
              {
                label: 'Office',
                number: '(415) 861-2024',
              },
            ],
            address: '3543 18th Street, Suite 7, San Francisco, CA 94110',
            website: 'https://www.sfwar.org/',
            hours: '24/7',
          },
          {
            category: 'legal-advocacy',
            name: 'San Francisco District Attorney - Victim Services Division',
            description:
              'DA division providing advocates who guide victims and families through the criminal justice process, restitution, and victim compensation.',
            phones: [
              {
                label: 'Main',
                number: '(628) 652-4100',
              },
            ],
            address: '350 Rhode Island Street, Suite 400N, San Francisco, CA 94103',
            website: 'https://sfdistrictattorney.org/victim-services/',
          },
        ],
      },
      {
        name: 'Oakland',
        slug: 'oakland',
        county: 'Alameda County',
        services: [
          {
            category: 'law-enforcement',
            name: 'Oakland Police Department',
            description:
              'City police for Oakland; the non-emergency line is answered 24 hours a day, and the Police Administration Building front desk is open around the clock.',
            phones: [
              {
                label: 'Non-emergency (24/7)',
                number: '(510) 777-3333',
              },
            ],
            address: '455 7th Street, Oakland, CA 94607',
            website: 'https://www.oaklandca.gov/departments/police',
            hours: '24/7',
          },
          {
            category: 'missing-persons',
            name: 'Oakland Police Department - Missing Persons Unit',
            description:
              'OPD unit that manages roughly 1,500 missing person cases a year; call to follow up on a report or share information (call or text 911 to make the initial report).',
            phones: [
              {
                label: 'Missing Persons Unit',
                number: '(510) 238-3641',
              },
            ],
            address: '455 7th Street, Oakland, CA 94607',
            website:
              'https://www.oaklandca.gov/Public-Safety-Streets/Crime-Prevention/Missing-Persons',
          },
          {
            category: 'law-enforcement',
            name: "Alameda County Sheriff's Office",
            description:
              'County sheriff serving unincorporated Alameda County; call the non-emergency line to report a crime or request assistance outside city police jurisdictions.',
            phones: [
              {
                label: 'Non-emergency',
                number: '(510) 667-7721',
              },
              {
                label: 'Administration',
                number: '(510) 272-6878',
              },
            ],
            address: '1401 Lakeside Drive, 12th Floor, Oakland, CA 94612',
            website: 'https://www.alamedasheriff.gov/',
          },
          {
            category: 'law-enforcement',
            name: 'FBI San Francisco Field Office (serves Oakland)',
            description:
              'Federal field office whose territory includes Alameda County and Oakland; takes reports of suspicious activity and crime 24/7 and assists on missing person and MMIP cases.',
            phones: [
              {
                label: 'Main (24/7)',
                number: '(415) 553-7400',
              },
            ],
            address: '450 Golden Gate Avenue, 13th Floor, San Francisco, CA 94102',
            website: 'https://www.fbi.gov/contact-us/field-offices/sanfrancisco',
            hours: '24/7',
          },
          {
            category: 'native-health',
            name: 'Native American Health Center - Oakland (7 Directions)',
            description:
              'Flagship Oakland clinic of the Native American Health Center, offering medical, dental, behavioral health, and community wellness services rooted in Native culture.',
            phones: [
              {
                label: 'Medical',
                number: '(510) 535-4410',
              },
              {
                label: 'Dental',
                number: '(510) 535-4450',
              },
              {
                label: 'Community wellness',
                number: '(510) 434-5421',
              },
            ],
            address: '2950 International Blvd., Oakland, CA 94601',
            website: 'https://www.nativehealth.org/',
            native: true,
          },
          {
            category: 'dv-sa',
            name: 'Alameda Health System - SARRT (Sexual Assault Response and Recovery Team)',
            description:
              "Hospital-based program at the Wilma Chan Highland Hospital Campus in Oakland; now the county's responding agency for sexual assault forensic exams and advocacy, with a 24/7 crisis line for sexual assault, domestic violence, and trafficking survivors.",
            phones: [
              {
                label: '24/7 crisis line',
                number: '(510) 534-9290',
              },
            ],
            website: 'https://alamedahealthsystem.org/sarrt/',
            hours: '24/7',
          },
          {
            category: 'crisis-hotlines',
            name: 'Tri-Valley Haven - Alameda County 24-Hour Crisis Hotline',
            description:
              "Operates the 24-hour crisis hotline serving survivors of domestic violence and sexual assault county-wide (in partnership with Alameda Health System after BAWAR's 2025 closure), plus shelter and counseling from its Livermore center.",
            phones: [
              {
                label: '24-hour hotline (toll-free)',
                number: '1-800-884-8119',
              },
              {
                label: '24-hour hotline (local)',
                number: '(925) 449-5842',
              },
            ],
            address: '3663 Pacific Avenue, Livermore, CA 94550',
            website: 'https://www.trivalleyhaven.org/',
            hours: '24/7',
          },
          {
            category: 'legal-advocacy',
            name: 'Family Violence Law Center',
            description:
              'Alameda County nonprofit providing free legal help (restraining orders, family law) and 24/7 crisis intervention for domestic violence survivors.',
            phones: [
              {
                label: '24/7 crisis line',
                number: '1-800-947-8301',
              },
              {
                label: 'Office',
                number: '(510) 208-3557',
              },
            ],
            address: '470 27th Street, Oakland, CA 94612',
            website: 'https://fvlc.org/',
            hours: '24/7',
          },
          {
            category: 'legal-advocacy',
            name: 'Alameda County DA Victim-Witness Assistance Division',
            description:
              'District Attorney advocates who help crime victims and witnesses with their rights, safety, court support, and connections to services.',
            phones: [
              {
                label: 'Main',
                number: '(510) 272-6180',
              },
            ],
            address: '1401 Lakeside Drive, Suite 802, Oakland, CA 94612',
            website: 'https://www.alcoda.org/victim-witness/',
          },
        ],
      },
      {
        name: 'San Jose',
        slug: 'san-jose',
        county: 'Santa Clara County',
        services: [
          {
            category: 'law-enforcement',
            name: 'San Jose Police Department',
            description:
              'City police for San Jose; call the non-emergency line for police matters that do not need an immediate response.',
            phones: [
              {
                label: 'Non-emergency',
                number: '(408) 277-8900',
              },
            ],
            address: '201 W Mission Street, San Jose, CA 95110',
            website: 'https://www.sjpd.org/',
          },
          {
            category: 'missing-persons',
            name: 'San Jose Police Department - Missing Persons Unit',
            description:
              'SJPD detail handling both adult and juvenile missing person cases; reports can be filed immediately.',
            phones: [
              {
                label: 'Missing Persons (adult & juvenile)',
                number: '(408) 277-4786',
              },
            ],
            address: '201 W Mission Street, San Jose, CA 95110',
            website: 'https://www.sjpd.org/',
          },
          {
            category: 'law-enforcement',
            name: "Santa Clara County Sheriff's Office",
            description:
              'County sheriff serving unincorporated Santa Clara County and several contract cities; use the non-emergency dispatch line to reach a deputy.',
            phones: [
              {
                label: 'Non-emergency',
                number: '(408) 299-2311',
              },
              {
                label: 'Main',
                number: '(408) 808-4400',
              },
            ],
            address: '55 W Younger Ave, San Jose, CA 95110',
            website: 'https://sheriff.santaclaracounty.gov/',
          },
          {
            category: 'law-enforcement',
            name: 'FBI San Francisco Field Office (serves San Jose)',
            description:
              'Federal field office whose Bay Area territory includes Santa Clara County and San Jose; takes reports of suspicious activity and crime 24/7 and assists on missing person and MMIP cases.',
            phones: [
              {
                label: 'Main (24/7)',
                number: '(415) 553-7400',
              },
            ],
            address: '450 Golden Gate Avenue, 13th Floor, San Francisco, CA 94102',
            website: 'https://www.fbi.gov/contact-us/field-offices/sanfrancisco',
            hours: '24/7',
          },
          {
            category: 'native-health',
            name: 'Indian Health Center of Santa Clara Valley',
            description:
              'Native-led community health center offering medical, dental, behavioral health, and wellness services for Native families and the wider community.',
            phones: [
              {
                label: 'Main',
                number: '(408) 445-3400',
              },
            ],
            address: '1333 Meridian Avenue, San Jose, CA 95125',
            website: 'https://indianhealthcenter.org/',
            native: true,
          },
          {
            category: 'dv-sa',
            name: 'YWCA Golden Gate Silicon Valley',
            description:
              "Santa Clara County's crisis agency for domestic violence, sexual assault, and trafficking survivors, with a 24/7 bilingual support line, shelter, therapy, and legal services.",
            phones: [
              {
                label: '24/7 support line',
                number: '1-800-572-2782',
              },
              {
                label: 'Main office',
                number: '(408) 295-4011',
              },
            ],
            address: '375 S. Third St., San Jose, CA 95112',
            website: 'https://yourywca.org/',
            hours: '24/7',
          },
        ],
      },
      {
        name: 'Eureka & Humboldt County',
        slug: 'eureka-humboldt',
        county: 'Humboldt County',
        services: [
          {
            category: 'law-enforcement',
            name: 'Eureka Police Department',
            description:
              'City police for Eureka; call non-emergency dispatch to reach an officer or report a crime that is not in progress.',
            phones: [
              {
                label: 'Non-emergency dispatch',
                number: '(707) 441-4044',
              },
              {
                label: 'Business office',
                number: '(707) 441-4060',
              },
            ],
            address: '604 C Street, Eureka, CA 95501',
            website: 'https://www.eurekaca.gov/172/Police-Department',
          },
          {
            category: 'law-enforcement',
            name: "Humboldt County Sheriff's Office",
            description:
              "County sheriff serving Humboldt County's unincorporated communities, including much of the rural north coast; call the non-emergency line for reports and assistance.",
            phones: [
              {
                label: 'Non-emergency',
                number: '(707) 445-7251',
              },
            ],
            address: '826 4th Street, Eureka, CA 95501',
            website: 'https://humboldtgov.org/2545/Sheriffs-Office',
          },
          {
            category: 'law-enforcement',
            name: 'Yurok Tribal Police',
            description:
              'Tribal law enforcement for the Yurok Reservation and Klamath River communities; a first call for incidents and missing relatives on Yurok lands.',
            phones: [
              {
                label: 'Non-emergency',
                number: '(707) 482-8185',
              },
            ],
            address: '230 Klamath Blvd, Ste. B, Klamath, CA 95548',
            website: 'https://www.yuroktribe.org/yurok-tribal-police',
            native: true,
          },
          {
            category: 'law-enforcement',
            name: 'Hoopa Valley Tribal Police',
            description:
              'Tribal law enforcement for the Hoopa Valley Reservation; a first call for incidents and missing relatives on Hoopa lands (mailing address PO Box 1341, Hoopa, CA 95546).',
            phones: [
              {
                label: 'Main',
                number: '(530) 625-4202',
              },
            ],
            website:
              'https://www.hoopa-nsn.gov/departments/1490-2/emergency-service-departments/hoopa-valley-tribal-police-department/',
            native: true,
          },
          {
            category: 'native-health',
            name: 'United Indian Health Services - Potawot Health Village',
            description:
              'Tribally governed health system for Native people of Humboldt and Del Norte counties, with medical, dental, behavioral health, and community programs at its Potawot Health Village campus in Arcata.',
            phones: [
              {
                label: 'Main',
                number: '(707) 825-5000',
              },
            ],
            address: '1600 Weeot Way, Arcata, CA 95521',
            website: 'https://unitedindianhealthservices.org/',
            native: true,
          },
          {
            category: 'native-health',
            name: 'Two Feathers Native American Family Services',
            description:
              'Native-led family services agency for Humboldt County offering culturally grounded mental health counseling, youth programs, and family support.',
            phones: [
              {
                label: 'Main',
                number: '(707) 839-1933',
              },
            ],
            address: '1560 Betty Court, Suite A, McKinleyville, CA 95519',
            website: 'https://twofeathers-nafs.org/',
            native: true,
          },
          {
            category: 'dv-sa',
            name: 'North Coast Rape Crisis Team',
            description:
              'Rape crisis center for Humboldt and Del Norte counties with 24/7 hotlines, accompaniment, and advocacy for survivors of sexual violence.',
            phones: [
              {
                label: '24/7 hotline (Humboldt)',
                number: '(707) 445-2881',
              },
              {
                label: '24/7 hotline (Del Norte)',
                number: '(707) 465-2851',
              },
              {
                label: 'Text line (Mon-Fri 8:30am-4:30pm)',
                number: '(707) 382-5174',
              },
            ],
            website: 'https://www.ncrct.org/',
            hours: '24/7',
          },
          {
            category: 'dv-sa',
            name: 'Humboldt Domestic Violence Services',
            description:
              'Humboldt County domestic violence agency with a 24/7 support line, safety planning, shelter, and advocacy.',
            phones: [
              {
                label: '24/7 support line',
                number: '(707) 443-6042',
              },
              {
                label: '24/7 support line (toll-free)',
                number: '1-833-507-2331',
              },
            ],
            website: 'https://www.hdvs.org/',
            hours: '24/7',
          },
          {
            category: 'legal-advocacy',
            name: 'California Indian Legal Services - Northern Office (McKinleyville)',
            description:
              'CILS office serving Del Norte, Humboldt, Mendocino, Siskiyou, and Trinity counties with free or low-cost legal help for Native individuals and tribes (formerly located in Eureka).',
            phones: [
              {
                label: 'Main office',
                number: '(707) 443-8397',
              },
              {
                label: 'Toll-free',
                number: '1-800-347-2402',
              },
            ],
            address: '2355 Central Avenue, Suite C, McKinleyville, CA 95519',
            website: 'https://www.calindian.org/',
            native: true,
          },
          {
            category: 'legal-advocacy',
            name: 'Humboldt County DA Victim Witness Assistance Program',
            description:
              'District Attorney program offering crisis intervention, emergency assistance, court support, and help with victim compensation for crime victims and their families.',
            phones: [
              {
                label: 'Main',
                number: '(707) 445-7411',
              },
            ],
            address: '825 5th Street, Fourth Floor, Eureka, CA 95501',
            website: 'https://humboldtgov.org/1360/Victim-Witness-Assistance-Program',
            hours: 'Mon-Fri 8am-12pm, 1pm-4pm',
          },
        ],
      },
      {
        name: 'Redding',
        slug: 'redding',
        county: 'Shasta County',
        services: [
          {
            category: 'law-enforcement',
            name: 'Redding Police Department',
            description:
              'City police for Redding; dial the main number and press 1 to be routed to SHASCOM dispatch for non-emergencies.',
            phones: [
              {
                label: 'Non-emergency (press 1 for dispatch)',
                number: '(530) 225-4200',
              },
            ],
            address: '777 Cypress Avenue, Redding, CA 96001',
            website: 'https://www.cityofredding.gov/government/departments/police/index.php',
          },
          {
            category: 'law-enforcement',
            name: "Shasta County Sheriff's Office",
            description:
              "County sheriff serving Shasta County's unincorporated communities; call to speak with a deputy about non-emergency reports and assistance.",
            phones: [
              {
                label: 'Non-emergency (speak to a deputy)',
                number: '(530) 245-6540',
              },
              {
                label: 'Main office',
                number: '(530) 245-6000',
              },
            ],
            address: '300 Park Marina Circle, Redding, CA 96001',
            website: 'https://www.shastacounty.gov/sheriff',
            hours: 'Lobby: Mon-Thu 8:00am-5:00pm (closed Fri)',
          },
          {
            category: 'law-enforcement',
            name: 'FBI Sacramento Field Office (serves Redding)',
            description:
              'Federal field office covering the Eastern District of California, which includes Shasta County and Redding; takes reports of suspicious activity and crime 24/7 and assists on missing person and MMIP cases.',
            phones: [
              {
                label: 'Main (24/7)',
                number: '(916) 746-7000',
              },
            ],
            address: '2001 Freedom Way, Roseville, CA 95678',
            website: 'https://www.fbi.gov/contact-us/field-offices/sacramento',
            hours: '24/7',
          },
          {
            category: 'native-health',
            name: 'Redding Rancheria Tribal Health System',
            description:
              'Tribally operated health system offering medical, dental, and behavioral health care at its Redding clinics, including the Tribal Health Center and Churn Creek Healthcare.',
            phones: [
              {
                label: 'Tribal Health Center',
                number: '(530) 224-2700',
              },
              {
                label: 'Churn Creek Healthcare',
                number: '(530) 768-2436',
              },
            ],
            address: '1441 Liberty St, Redding, CA 96001',
            website: 'https://www.rrths.org/',
            native: true,
          },
          {
            category: 'dv-sa',
            name: 'One SAFE Place',
            description:
              "Shasta County's center for survivors of domestic violence and sexual assault, with a 24/7 crisis line, emergency shelter, advocacy, and support services.",
            phones: [
              {
                label: '24/7 crisis line',
                number: '(530) 429-0055',
              },
              {
                label: 'Business office',
                number: '(530) 244-0117',
              },
            ],
            address: '2250 Benton Drive, Redding, CA 96003',
            website: 'https://www.ospshasta.org/',
            hours: '24/7',
          },
        ],
      },
    ],
  },
  {
    id: 'central',
    name: 'Central California',
    description: 'The Central Valley and the Eastern Sierra',
    cities: [
      {
        name: 'Fresno',
        slug: 'fresno',
        county: 'Fresno County',
        services: [
          {
            category: 'law-enforcement',
            name: 'Fresno Police Department',
            description:
              'City police for Fresno; call the non-emergency line to reach an officer, file a report, or report a missing person inside city limits (call 911 in an emergency).',
            phones: [
              {
                label: 'Non-emergency',
                number: '(559) 621-7000',
              },
              {
                label: 'Investigative Services Division',
                number: '(559) 621-2400',
              },
            ],
            address: '2323 Mariposa Mall, Fresno, CA 93721',
            website: 'https://www.fresno.gov/police/',
          },
          {
            category: 'law-enforcement',
            name: "Fresno County Sheriff's Office",
            description:
              'County sheriff for unincorporated Fresno County; call the non-emergency dispatch line for incidents outside city limits or to report a missing person in the county.',
            phones: [
              {
                label: 'Non-emergency dispatch',
                number: '(559) 600-3111',
              },
              {
                label: 'Records',
                number: '(559) 600-8400',
              },
            ],
            address: '2200 Fresno Street, Fresno, CA 93721',
            website: 'https://www.fresnosheriff.org/',
          },
          {
            category: 'missing-persons',
            name: "Fresno County Sheriff's Office – Missing Persons Unit",
            description:
              'Detective bureau unit for missing person and runaway cases; report first to the agency where the person was last seen (city of Fresno (559) 621-7000, county areas (559) 600-3111).',
            phones: [
              {
                label: 'Missing persons detective',
                number: '(559) 600-8200',
              },
              {
                label: 'County reporting line',
                number: '(559) 600-3111',
              },
            ],
            address: '2200 Fresno Street, Fresno, CA 93721',
            website:
              'https://www.fresnosheriff.org/units/detective-bureau/missing-persons-runaways.html',
          },
          {
            category: 'law-enforcement',
            name: 'FBI Sacramento Field Office – Fresno Resident Agency',
            description:
              'Federal investigators for crimes on tribal land, kidnappings, and cases crossing county or state lines; the Fresno satellite office serves Fresno, Kings, Madera, Mariposa, Merced, and Tulare counties through the 24/7 field office line.',
            phones: [
              {
                label: '24/7 field office line',
                number: '(916) 746-7000',
              },
            ],
            website: 'https://www.fbi.gov/contact-us/field-offices/sacramento',
            hours: '24/7',
          },
          {
            category: 'native-health',
            name: 'Fresno American Indian Health Project (FAIHP)',
            description:
              'Urban Indian health program offering culturally based health, wellness, youth, and community support services for Native people in the Fresno area.',
            phones: [
              {
                label: 'Main',
                number: '(559) 320-0490',
              },
            ],
            address: '1551 E. Shaw Ave., Suite 139, Fresno, CA 93710',
            website: 'https://www.faihp.org/',
            native: true,
          },
          {
            category: 'native-health',
            name: 'Central Valley Indian Health, Inc.',
            description:
              'Tribal health program providing medical, dental, and behavioral health care to Native American families in the Fresno/Clovis area.',
            phones: [
              {
                label: 'Main (Clovis clinic)',
                number: '(559) 299-2578',
              },
            ],
            address: '2740 Herndon Avenue, Clovis, CA 93611',
            website: 'https://cvih.org/',
            native: true,
          },
          {
            category: 'dv-sa',
            name: 'Marjaree Mason Center',
            description:
              "Fresno County's domestic violence agency with emergency safe housing, legal advocacy, and counseling; call the 24/7 hotline for help or shelter.",
            phones: [
              {
                label: '24/7 hotline (233-HELP)',
                number: '(559) 233-4357',
              },
            ],
            address: '255 W. Bullard Ave., Fresno, CA 93704',
            website: 'https://mmcenter.org/',
            hours: '24/7',
          },
          {
            category: 'dv-sa',
            name: 'RCS Fresno (Rape Counseling Service of Fresno)',
            description:
              'Free, confidential sexual assault crisis center for Fresno County with counseling, advocacy, and hospital accompaniment; the crisis line answers 24 hours a day.',
            phones: [
              {
                label: '24/7 crisis line (222-RAPE)',
                number: '(559) 222-7273',
              },
              {
                label: 'Office',
                number: '(559) 497-2900',
              },
            ],
            address: '259 N. Blackstone Ave., Fresno, CA 93701',
            website: 'https://rcsfresno.org/',
            hours: '24/7',
          },
          {
            category: 'legal-advocacy',
            name: 'James Rowland Crime Victim Assistance Center (Fresno County)',
            description:
              'County victim advocates who help crime victims and their families with crisis intervention, court support, restitution, and California victim compensation claims at no cost.',
            phones: [
              {
                label: 'Main (600-CVAC)',
                number: '(559) 600-2822',
              },
            ],
            address: '2220 Tulare St., Suite 1111, Fresno, CA 93721',
            website: 'https://www.fresnocountyca.gov/Departments/Probation/Crime-Victim-Services',
            hours: 'Mon-Fri 8am-12pm, 1pm-5pm',
          },
          {
            category: 'legal-advocacy',
            name: 'California Indian Legal Services – Central Office',
            description:
              'Nonprofit law firm for Native individuals and tribes; the Sacramento-based Central Office serves Fresno, Kings, Madera, Mariposa, and Merced counties by phone and appointment.',
            phones: [
              {
                label: 'Office',
                number: '(916) 978-0960',
              },
              {
                label: 'Toll-free',
                number: '1-800-829-0284',
              },
            ],
            address: '106 K Street, Suite 300, Sacramento, CA 95814',
            website: 'https://www.calindian.org/',
            native: true,
          },
        ],
      },
      {
        name: 'Bakersfield',
        slug: 'bakersfield',
        county: 'Kern County',
        services: [
          {
            category: 'law-enforcement',
            name: 'Bakersfield Police Department',
            description:
              'City police for Bakersfield; call the non-emergency line to reach an officer or file a report, including missing person reports inside city limits (911 in an emergency).',
            phones: [
              {
                label: 'Non-emergency',
                number: '(661) 327-7111',
              },
              {
                label: 'Investigations Division',
                number: '(661) 326-3846',
              },
            ],
            address: '1601 Truxtun Avenue, Bakersfield, CA 93301',
            website: 'https://www.bakersfieldcity.us/257/Police',
          },
          {
            category: 'law-enforcement',
            name: "Kern County Sheriff's Office",
            description:
              'County sheriff for unincorporated Kern County; call the non-emergency line for incidents or missing person reports outside city limits.',
            phones: [
              {
                label: 'Non-emergency',
                number: '(661) 861-3110',
              },
              {
                label: 'Toll-free (Kern County only)',
                number: '1-800-861-3110',
              },
              {
                label: 'Main office',
                number: '(661) 391-7500',
              },
            ],
            address: '1350 Norris Road, Bakersfield, CA 93308',
            website: 'https://www.kernsheriff.org/',
          },
          {
            category: 'law-enforcement',
            name: 'FBI Sacramento Field Office – Bakersfield Resident Agency',
            description:
              'Federal investigators for crimes on tribal land, kidnappings, and multi-jurisdiction cases; the Bakersfield satellite office serves Kern and Inyo counties through the 24/7 field office line.',
            phones: [
              {
                label: '24/7 field office line',
                number: '(916) 746-7000',
              },
            ],
            website: 'https://www.fbi.gov/contact-us/field-offices/sacramento',
            hours: '24/7',
          },
          {
            category: 'native-health',
            name: 'Bakersfield American Indian Health Project',
            description:
              "Kern County's urban Indian health organization, offering health, behavioral health, and community services for Native families in Bakersfield and at a Lake Isabella site.",
            phones: [
              {
                label: 'Bakersfield office',
                number: '(661) 327-4030',
              },
              {
                label: 'Lake Isabella office',
                number: '(760) 549-0001',
              },
            ],
            address: '501 40th Street, Bakersfield, CA 93301',
            website: 'https://bakersfieldaihp.org/',
            hours: 'Mon 8am-6pm; Tue-Thu 8am-8pm; Fri 8am-5pm',
            native: true,
          },
          {
            category: 'dv-sa',
            name: 'The Open Door Network (formerly Alliance Against Family Violence & Sexual Assault)',
            description:
              'Kern County services for survivors of domestic violence, sexual assault, and human trafficking, including emergency shelter and advocacy; call the 24-hour crisis hotline for immediate help.',
            phones: [
              {
                label: '24/7 crisis hotline',
                number: '(661) 327-1091',
              },
              {
                label: 'Office',
                number: '(661) 322-9199',
              },
            ],
            website: 'https://opendoorhelps.org/',
            hours: '24/7',
          },
          {
            category: 'legal-advocacy',
            name: 'Kern County Family Justice Center',
            description:
              'A safe, confidential one-stop center where victims of domestic violence, sexual assault, human trafficking, child abuse, and elder abuse get help from many agencies at no cost.',
            phones: [
              {
                label: 'Bakersfield center',
                number: '(661) 868-5950',
              },
              {
                label: 'Lamont center',
                number: '(661) 868-5820',
              },
            ],
            address: '1300 18th Street, Bakersfield, CA 93301',
            website: 'https://kcfjc.org/',
          },
          {
            category: 'legal-advocacy',
            name: 'Kern County District Attorney – Victim Services Unit',
            description:
              'DA advocates who guide crime victims through the court process and help with victim compensation, restitution, and safety planning.',
            phones: [
              {
                label: 'Victim services',
                number: '(661) 868-2400',
              },
            ],
            address: '1415 Truxtun Ave, Bakersfield, CA 93301',
            website:
              'https://www.kerncounty.com/government/departments/district-attorney/about/divisions/victim-services',
          },
          {
            category: 'legal-advocacy',
            name: 'California Indian Legal Services – Eastern Office (serves Kern County)',
            description:
              'Nonprofit Native legal aid; the Bishop-based Eastern Office handles Indian law and legal assistance for Alpine, Inyo, Kern, Mono, and Tuolumne counties.',
            phones: [
              {
                label: 'Office',
                number: '(760) 873-3581',
              },
              {
                label: 'Toll-free',
                number: '1-800-736-3582',
              },
            ],
            address: '873 N. Main Street, Suite 120, Bishop, CA 93514',
            website: 'https://www.calindian.org/',
            native: true,
          },
        ],
      },
      {
        name: 'Stockton',
        slug: 'stockton',
        county: 'San Joaquin County',
        services: [
          {
            category: 'law-enforcement',
            name: 'Stockton Police Department',
            description:
              'City police for Stockton; call the non-emergency line to reach an officer, file a report, or report a missing person inside city limits (911 in an emergency).',
            phones: [
              {
                label: 'Non-emergency',
                number: '(209) 937-8377',
              },
              {
                label: 'Records',
                number: '(209) 937-8495',
              },
            ],
            address: '22 E. Market Street, Stockton, CA 95202',
            website: 'https://www.stocktonca.gov/services/police_department/index.php',
          },
          {
            category: 'law-enforcement',
            name: "San Joaquin County Sheriff's Office",
            description:
              'County sheriff for unincorporated San Joaquin County; call the non-emergency line for incidents or missing person reports outside city limits.',
            phones: [
              {
                label: 'Non-emergency',
                number: '(209) 468-4400',
              },
            ],
            address: '7000 Michael Canlis Blvd., French Camp, CA 95231',
            website: 'https://sjsheriff.org/',
          },
          {
            category: 'law-enforcement',
            name: 'FBI Sacramento Field Office – Stockton Resident Agency',
            description:
              'Federal investigators for kidnappings and multi-jurisdiction cases; the Stockton satellite office serves San Joaquin, Stanislaus, Amador, Calaveras, and Tuolumne counties through the 24/7 field office line.',
            phones: [
              {
                label: '24/7 field office line',
                number: '(916) 746-7000',
              },
            ],
            website: 'https://www.fbi.gov/contact-us/field-offices/sacramento',
            hours: '24/7',
          },
          {
            category: 'dv-sa',
            name: "PREVAIL (formerly Women's Center – Youth & Family Services)",
            description:
              "San Joaquin County's provider of free, confidential services and shelter for survivors of domestic violence, sexual assault, and trafficking, plus youth services; crisis lines answer 24 hours a day.",
            phones: [
              {
                label: '24/7 crisis line',
                number: '(209) 465-4878',
              },
              {
                label: '24/7 youth crisis line',
                number: '(209) 948-1911',
              },
              {
                label: 'Office',
                number: '(209) 941-2611',
              },
            ],
            address: '620 N. San Joaquin Street, Stockton, CA 95202',
            website: 'https://weshallprevail.org/',
            hours: '24/7',
          },
          {
            category: 'native-health',
            name: 'Native Directions, Inc. – Three Rivers Indian Lodge',
            description:
              'Native-run nonprofit near Manteca offering a culturally based 90-day residential alcohol and drug treatment program for Native American men, serving the San Joaquin Valley.',
            phones: [
              {
                label: 'Main',
                number: '(209) 858-2421',
              },
            ],
            address: '13505 S. Union Road, Manteca, CA 95336',
            website: 'https://www.nativedirections.org/',
            native: true,
          },
          {
            category: 'legal-advocacy',
            name: 'San Joaquin County District Attorney – Victim-Witness Services',
            description:
              'DA advocates offering crisis intervention, court support, emergency assistance, and help filing victim compensation claims for crime victims and witnesses.',
            phones: [
              {
                label: 'Victim-witness',
                number: '(209) 468-2500',
              },
            ],
            address: '222 E. Weber Avenue, Stockton, CA 95202',
            website: 'https://sjcda.org/victim-witness/vws',
            hours: 'Mon-Fri 8am-5pm',
          },
          {
            category: 'legal-advocacy',
            name: 'California Indian Legal Services – Central Office',
            description:
              'Nonprofit law firm for Native individuals and tribes; the Sacramento-based Central Office serves San Joaquin County by phone and appointment.',
            phones: [
              {
                label: 'Office',
                number: '(916) 978-0960',
              },
              {
                label: 'Toll-free',
                number: '1-800-829-0284',
              },
            ],
            address: '106 K Street, Suite 300, Sacramento, CA 95814',
            website: 'https://www.calindian.org/',
            native: true,
          },
        ],
      },
      {
        name: 'Modesto',
        slug: 'modesto',
        county: 'Stanislaus County',
        services: [
          {
            category: 'law-enforcement',
            name: 'Modesto Police Department',
            description:
              'City police for Modesto; call non-emergency dispatch to reach an officer, file a report, or report a missing person inside city limits (911 in an emergency).',
            phones: [
              {
                label: 'Non-emergency dispatch',
                number: '(209) 552-2470',
              },
              {
                label: 'Main',
                number: '(209) 572-9500',
              },
            ],
            address: '600 10th Street, Modesto, CA 95354',
            website: 'https://www.modestogov.com/223/Police-Department',
          },
          {
            category: 'law-enforcement',
            name: "Stanislaus County Sheriff's Office",
            description:
              'County sheriff for unincorporated Stanislaus County; call the non-emergency line for incidents or missing person reports outside city limits.',
            phones: [
              {
                label: 'Non-emergency',
                number: '(209) 552-2468',
              },
            ],
            address: '250 E. Hackett Road, Modesto, CA 95358',
            website: 'https://www.scsdonline.com/',
          },
          {
            category: 'law-enforcement',
            name: 'FBI Sacramento Field Office (Stockton Resident Agency serves Stanislaus County)',
            description:
              'Federal investigators for kidnappings and multi-jurisdiction cases; Stanislaus County is covered by the Stockton satellite office, reached through the 24/7 Sacramento field office line.',
            phones: [
              {
                label: '24/7 field office line',
                number: '(916) 746-7000',
              },
            ],
            website: 'https://www.fbi.gov/contact-us/field-offices/sacramento',
            hours: '24/7',
          },
          {
            category: 'dv-sa',
            name: "HAVEN (formerly Haven Women's Center of Stanislaus)",
            description:
              "Stanislaus County's agency for survivors of domestic violence, sexual assault, and human trafficking, with shelter, advocacy, and counseling; call the 24-hour crisis line for immediate help.",
            phones: [
              {
                label: '24/7 crisis line',
                number: '(209) 577-5980',
              },
              {
                label: 'Toll-free crisis (1-888-45-HAVEN)',
                number: '1-888-454-2836',
              },
              {
                label: 'Office',
                number: '(209) 524-4331',
              },
            ],
            address: '618 13th Street, Modesto, CA 95354',
            website: 'https://www.havenstan.org/',
            hours: '24/7',
          },
          {
            category: 'native-health',
            name: 'Native Directions, Inc. – Three Rivers Indian Lodge',
            description:
              'Native-run nonprofit in nearby Manteca (about 20 miles from Modesto) offering a culturally based 90-day residential alcohol and drug treatment program for Native American men; the closest Native-run recovery organization serving the area.',
            phones: [
              {
                label: 'Main',
                number: '(209) 858-2421',
              },
            ],
            address: '13505 S. Union Road, Manteca, CA 95336',
            website: 'https://www.nativedirections.org/',
            native: true,
          },
          {
            category: 'legal-advocacy',
            name: 'Stanislaus County District Attorney – Victim Services',
            description:
              'DA victim advocates who provide court support, case information, and help with victim compensation for crime victims throughout justice proceedings.',
            phones: [
              {
                label: 'Victim services',
                number: '(209) 525-5541',
              },
            ],
            address: '832 12th Street, Suite 300, Modesto, CA 95354',
            website: 'https://www.stanislaus-da.org/victim-services/',
            hours: 'Mon-Fri 9am-5pm',
          },
          {
            category: 'legal-advocacy',
            name: 'California Indian Legal Services – Central Office',
            description:
              'Nonprofit law firm for Native individuals and tribes; the Sacramento-based Central Office serves Stanislaus County by phone and appointment.',
            phones: [
              {
                label: 'Office',
                number: '(916) 978-0960',
              },
              {
                label: 'Toll-free',
                number: '1-800-829-0284',
              },
            ],
            address: '106 K Street, Suite 300, Sacramento, CA 95814',
            website: 'https://www.calindian.org/',
            native: true,
          },
        ],
      },
      {
        name: 'Visalia & Tulare County',
        slug: 'visalia-tulare',
        county: 'Tulare County',
        services: [
          {
            category: 'law-enforcement',
            name: 'Visalia Police Department',
            description:
              'City police for Visalia; call the non-emergency line to reach an officer, file a report, or report a missing person inside city limits (call or text 911 in an emergency).',
            phones: [
              {
                label: 'Non-emergency',
                number: '(559) 734-8117',
              },
              {
                label: 'Administration',
                number: '(559) 734-8116',
              },
            ],
            address: '303 S. Johnson Street, Visalia, CA 93291',
            website: 'https://www.visalia.gov/201/Police',
          },
          {
            category: 'law-enforcement',
            name: "Tulare County Sheriff's Office",
            description:
              'County sheriff for unincorporated Tulare County, including communities around the Tule River Reservation; dispatch answers around the clock for emergencies, with office hours Mon-Fri 8am-5pm.',
            phones: [
              {
                label: 'Non-emergency dispatch',
                number: '(559) 733-6218',
              },
              {
                label: 'Headquarters',
                number: '(559) 802-9400',
              },
              {
                label: 'Toll-free',
                number: '1-800-808-0488',
              },
            ],
            address: '833 S. Akers Street, Visalia, CA 93277',
            website: 'https://tularecounty.ca.gov/sheriff/',
            hours: '24/7',
          },
          {
            category: 'law-enforcement',
            name: 'Tule River Tribal Police Department',
            description:
              'Tribal law enforcement for the Tule River Reservation near Porterville, protecting tribal members and working with county, state, and federal agencies.',
            phones: [
              {
                label: 'Main',
                number: '(559) 781-4271',
              },
            ],
            address: '340 N. Reservation Road, Porterville, CA 93257',
            website: 'https://tulerivertribe-nsn.gov/dps-2/',
            native: true,
          },
          {
            category: 'law-enforcement',
            name: 'Santa Rosa Rancheria Tachi Yokut Tribe – Department of Public Safety',
            description:
              'Tribal public safety and law enforcement for the Santa Rosa Rancheria in Lemoore (Kings County, west of Visalia), serving tribal members, residents, and visitors.',
            phones: [
              {
                label: 'DPS dispatch',
                number: '(559) 925-2835',
              },
              {
                label: 'Tribal main line',
                number: '(559) 924-1278',
              },
            ],
            address: '16835 Alkali Drive, Lemoore, CA 93245',
            website: 'https://www.tachi-yokut-nsn.gov/public-safety',
            native: true,
          },
          {
            category: 'law-enforcement',
            name: 'FBI Sacramento Field Office – Fresno Resident Agency (serves Tulare & Kings Counties)',
            description:
              'Federal investigators for crimes on tribal land, kidnappings, and multi-jurisdiction cases; Tulare and Kings counties are covered by the Fresno satellite office through the 24/7 field office line.',
            phones: [
              {
                label: '24/7 field office line',
                number: '(916) 746-7000',
              },
            ],
            website: 'https://www.fbi.gov/contact-us/field-offices/sacramento',
            hours: '24/7',
          },
          {
            category: 'native-health',
            name: 'Tule River Indian Health Center',
            description:
              'Tribal health center on the Tule River Reservation providing medical, dental, and behavioral health care to Native families in the Porterville area.',
            phones: [
              {
                label: 'Main',
                number: '(559) 784-2316',
              },
            ],
            address: '380 N. Reservation Road, Porterville, CA 93257',
            website: 'https://www.trihci.org/',
            hours: 'Mon-Fri 7:30am-5:30pm',
            native: true,
          },
          {
            category: 'dv-sa',
            name: 'Family Services of Tulare County',
            description:
              "Tulare County's provider of domestic violence and sexual assault services, including emergency shelter, counseling, and advocacy; both hotlines answer 24 hours a day.",
            phones: [
              {
                label: '24/7 domestic violence hotline',
                number: '(559) 732-5941',
              },
              {
                label: '24/7 rape crisis hotline',
                number: '(559) 732-7273',
              },
              {
                label: 'General information',
                number: '(559) 741-7310',
              },
            ],
            website: 'https://fstc.net/',
            hours: '24/7',
          },
          {
            category: 'legal-advocacy',
            name: 'Tulare County District Attorney – Victim/Witness Assistance',
            description:
              'DA advocates offering crisis intervention, court support, case status, and help applying for California victim compensation, with offices in Visalia and Porterville.',
            phones: [
              {
                label: 'Visalia office',
                number: '(559) 636-5471',
              },
              {
                label: 'Porterville office',
                number: '(559) 701-2020',
              },
            ],
            address: '221 S. Mooney Blvd., Room 264, Visalia, CA 93291',
            website: 'https://tulareda.org/victim-witness/',
          },
          {
            category: 'legal-advocacy',
            name: 'California Indian Legal Services – Central Office',
            description:
              'Nonprofit law firm for Native individuals and tribes; the Sacramento-based Central Office serves Tulare and Kings counties by phone and appointment.',
            phones: [
              {
                label: 'Office',
                number: '(916) 978-0960',
              },
              {
                label: 'Toll-free',
                number: '1-800-829-0284',
              },
            ],
            address: '106 K Street, Suite 300, Sacramento, CA 95814',
            website: 'https://www.calindian.org/',
            native: true,
          },
        ],
      },
      {
        name: 'Bishop & Eastern Sierra',
        slug: 'bishop-eastern-sierra',
        county: 'Inyo County',
        services: [
          {
            category: 'law-enforcement',
            name: 'Bishop Police Department',
            description:
              'City police for Bishop; call the main line and select option 2 to request an officer or report a non-emergency, including missing person reports inside city limits (911 in an emergency).',
            phones: [
              {
                label: 'Non-emergency (select option 2)',
                number: '(760) 873-5866',
              },
            ],
            address: '207 W. Line Street, Bishop, CA 93514',
            website: 'https://cityofbishop.ca.gov/departments/police/',
          },
          {
            category: 'law-enforcement',
            name: "Inyo County Sheriff's Office",
            description:
              'County sheriff for Inyo County and the Eastern Sierra outside Bishop city limits; call the main line for non-emergencies and missing person reports (911 in an emergency).',
            phones: [
              {
                label: 'Main / non-emergency',
                number: '(760) 878-0383',
              },
            ],
            address: '550 S. Clay Street, Independence, CA 93526',
            website: 'https://www.inyocounty.us/services/sheriff',
            hours: 'Office Mon-Fri 8am-5pm',
          },
          {
            category: 'law-enforcement',
            name: 'Bishop Paiute Tribal Police Department',
            description:
              'Tribal police for the Bishop Paiute Reservation; dispatch is staffed Monday-Friday 8am-5pm, so call 911 for emergencies or after hours.',
            phones: [
              {
                label: 'Dispatch (Mon-Fri 8am-5pm)',
                number: '(760) 873-4477',
              },
            ],
            address: '50 Tu Su Lane, Bishop, CA 93514',
            website: 'https://bishoppaiute.net/departments/tribal-police/',
            hours: 'Mon-Fri 8am-5pm',
            native: true,
          },
          {
            category: 'law-enforcement',
            name: 'FBI Sacramento Field Office – Bakersfield Resident Agency (serves Inyo County)',
            description:
              'Federal investigators for crimes on tribal land, kidnappings, and multi-jurisdiction cases; Inyo County is covered by the Bakersfield satellite office through the 24/7 field office line.',
            phones: [
              {
                label: '24/7 field office line',
                number: '(916) 746-7000',
              },
            ],
            website: 'https://www.fbi.gov/contact-us/field-offices/sacramento',
            hours: '24/7',
          },
          {
            category: 'native-health',
            name: 'Toiyabe Indian Health Project',
            description:
              'Tribal health organization serving Native communities across the Eastern Sierra with medical, dental, behavioral health, and family services from its Bishop clinic.',
            phones: [
              {
                label: 'Main (Bishop clinic)',
                number: '(760) 873-8464',
              },
            ],
            address: '250 N. See Vee Lane, Bishop, CA 93514',
            website: 'https://www.toiyabe.us/',
            native: true,
          },
          {
            category: 'dv-sa',
            name: 'Wild Iris Family Counseling & Crisis Center',
            description:
              'Free, confidential support for victims of domestic violence, sexual assault, and child abuse across Inyo and Mono counties; the crisis line takes calls or texts 24/7.',
            phones: [
              {
                label: '24/7 crisis line (call/text)',
                number: '1-877-873-7384',
              },
              {
                label: 'Bishop office',
                number: '(760) 873-6601',
              },
            ],
            address: '150 N. Main Street, Bishop, CA 93514',
            website: 'https://www.wild-iris.org/',
            hours: '24/7',
          },
          {
            category: 'legal-advocacy',
            name: 'California Indian Legal Services – Eastern Office (Bishop)',
            description:
              'Nonprofit Native legal aid office in Bishop handling Indian law and legal assistance for Alpine, Inyo, Kern, Mono, and Tuolumne counties.',
            phones: [
              {
                label: 'Office',
                number: '(760) 873-3581',
              },
              {
                label: 'Toll-free',
                number: '1-800-736-3582',
              },
            ],
            address: '873 N. Main Street, Suite 120, Bishop, CA 93514',
            website: 'https://www.calindian.org/',
            native: true,
          },
          {
            category: 'legal-advocacy',
            name: 'Inyo County District Attorney – Victim/Witness Assistance Program',
            description:
              'DA advocates who support crime victims through the criminal justice system, including compensation claims, crisis intervention, court orientation, and emergency assistance.',
            phones: [
              {
                label: 'Bishop office',
                number: '(760) 873-6669',
              },
              {
                label: 'Independence office',
                number: '(760) 878-0299',
              },
            ],
            address: '168 N. Edwards Street, Independence, CA 93526',
            website: 'https://www.inyocounty.us/services/district-attorney/victim-witness',
          },
        ],
      },
    ],
  },
  {
    id: 'south',
    name: 'Southern California',
    description: 'Los Angeles, San Diego, the Inland Empire, and desert tribal lands',
    cities: [
      {
        name: 'Los Angeles',
        slug: 'los-angeles',
        county: 'Los Angeles County',
        services: [
          {
            category: 'law-enforcement',
            name: 'Los Angeles Police Department',
            description:
              'City police for Los Angeles; call the non-emergency line to request police response or report a crime that is not in progress.',
            phones: [
              {
                label: 'Non-emergency (1-877-ASK-LAPD)',
                number: '1-877-275-5273',
              },
            ],
            address: '100 W 1st St, Los Angeles, CA 90012',
            website: 'https://www.lapdonline.org/',
          },
          {
            category: 'missing-persons',
            name: 'LAPD Adult Missing Persons Unit',
            description:
              'Investigates missing-adult cases in the City of Los Angeles; file the initial report at any LAPD station or by phone, then call the unit with questions about an adult case.',
            phones: [
              {
                label: 'Adult Missing Persons Unit',
                number: '(213) 996-1800',
              },
            ],
            website: 'https://www.lapdonline.org/how-to-report-a-missing-person/',
            hours: '7:00 a.m.-4:00 p.m. (leave a message after hours)',
          },
          {
            category: 'law-enforcement',
            name: "Los Angeles County Sheriff's Department",
            description:
              "County sheriff serving unincorporated LA County and contract cities; the Homicide Bureau's Missing Persons Detail handles county missing-person cases.",
            phones: [
              {
                label: 'Headquarters',
                number: '(213) 229-1700',
              },
              {
                label: 'Homicide Bureau (Missing Persons Detail)',
                number: '(323) 890-5500',
              },
            ],
            address: '211 W Temple St, Los Angeles, CA 90012',
            website: 'https://lasd.org/',
          },
          {
            category: 'law-enforcement',
            name: 'FBI Los Angeles Field Office',
            description:
              'Federal law enforcement for Central California including Los Angeles, Riverside, and San Bernardino counties; takes tips and reports of federal crimes, including cases on tribal land, 24/7.',
            phones: [
              {
                label: 'Main (24/7)',
                number: '(310) 477-6565',
              },
            ],
            address: '11000 Wilshire Blvd, Suite 1700, Los Angeles, CA 90024',
            website: 'https://www.fbi.gov/contact-us/field-offices/losangeles',
            hours: '24/7',
          },
          {
            category: 'native-health',
            name: 'United American Indian Involvement (UAII)',
            description:
              'Native-led center providing health, behavioral health, and community services for American Indians and Alaska Natives across Los Angeles.',
            phones: [
              {
                label: 'Main',
                number: '(213) 202-3970',
              },
            ],
            address: '1453 W Temple St, Los Angeles, CA 90026',
            website: 'https://uaii.org/',
            native: true,
          },
          {
            category: 'native-health',
            name: 'American Indian Counseling Center (LA County Dept. of Mental Health)',
            description:
              'County mental-health clinic for American Indian and Alaska Native people of all ages, offering counseling, crisis intervention, and culturally relevant support; call and ask for the on-duty worker.',
            phones: [
              {
                label: 'Main',
                number: '(562) 402-0677',
              },
            ],
            address: '10330 Pioneer Blvd, Suite 215, Santa Fe Springs, CA 90670',
            website:
              'https://dmh.lacounty.gov/about/service-areas/service-area-7/american-indian-counseling-center/',
            hours: 'Mon-Fri 8 a.m.-5 p.m.',
            native: true,
          },
          {
            category: 'dv-sa',
            name: 'Peace Over Violence',
            description:
              'Sexual assault and domestic violence services with 24/7 LA Rape & Battering hotlines, counseling, legal services, and emergency response advocacy.',
            phones: [
              {
                label: '24/7 Hotline (Central LA)',
                number: '(213) 626-3393',
              },
              {
                label: '24/7 Hotline (West LA)',
                number: '(310) 392-8381',
              },
              {
                label: '24/7 Hotline (San Gabriel Valley)',
                number: '(626) 793-3385',
              },
              {
                label: 'Office',
                number: '(213) 955-9090',
              },
            ],
            address: '1541 Wilshire Blvd, 3rd Floor, Los Angeles, CA 90017',
            website: 'https://www.peaceoverviolence.org/',
            hours: '24/7',
          },
          {
            category: 'legal-advocacy',
            name: 'LA County District Attorney - Bureau of Victim Services',
            description:
              'Free victim advocates who help crime victims and families with safety, court support, and California Victim Compensation claims.',
            phones: [
              {
                label: 'Request victim services',
                number: '1-800-380-3811',
              },
              {
                label: 'Claims Verification Unit (CalVCB)',
                number: '1-800-492-5944',
              },
            ],
            website: 'https://da.lacounty.gov/victims/',
          },
          {
            category: 'crisis-hotlines',
            name: 'LA County Dept. of Mental Health 24/7 Help Line',
            description:
              'County crisis and mental-health line for anyone in Los Angeles County; connects callers to crisis support and local service providers around the clock.',
            phones: [
              {
                label: '24/7 Help Line',
                number: '1-800-854-7771',
              },
            ],
            website: 'https://dmh.lacounty.gov/',
            hours: '24/7',
          },
        ],
      },
      {
        name: 'San Diego',
        slug: 'san-diego',
        county: 'San Diego County',
        services: [
          {
            category: 'law-enforcement',
            name: 'San Diego Police Department',
            description:
              'City police for San Diego; call the non-emergency line to report crimes that are not in progress or request police assistance.',
            phones: [
              {
                label: 'Non-emergency',
                number: '(619) 531-2000',
              },
              {
                label: 'Non-emergency (alternate)',
                number: '(858) 484-3154',
              },
            ],
            address: '1401 Broadway, San Diego, CA 92101',
            website: 'https://www.sandiego.gov/police',
          },
          {
            category: 'missing-persons',
            name: 'SDPD Missing Persons Unit',
            description:
              'Call 911 if the missing person is under 12 or the circumstances are suspicious; otherwise call the SDPD line to file a missing-person report - there is no waiting period, and adult cases go to the Missing Persons Unit.',
            phones: [
              {
                label: 'Report a missing person',
                number: '(619) 531-2000',
              },
            ],
            website: 'https://www.sandiego.gov/police/services/missing-persons',
          },
          {
            category: 'law-enforcement',
            name: "San Diego County Sheriff's Office",
            description:
              'County sheriff serving unincorporated San Diego County and nine contract cities; use the non-emergency line for situations that do not require an immediate response.',
            phones: [
              {
                label: 'Non-emergency',
                number: '(858) 868-3200',
              },
              {
                label: 'Main office',
                number: '(858) 974-2222',
              },
            ],
            address: '9621 Ridgehaven Ct, San Diego, CA 92123',
            website: 'https://www.sdsheriff.gov/',
          },
          {
            category: 'law-enforcement',
            name: 'Sycuan Tribal Police Department',
            description:
              'Full-service tribal law enforcement for the Sycuan Reservation and surrounding Dehesa Valley, working with the San Diego County Sheriff and BIA; call dispatch for assistance on or near the reservation.',
            phones: [
              {
                label: 'Dispatch',
                number: '(619) 445-2172',
              },
              {
                label: 'Main office',
                number: '(619) 445-8710',
              },
            ],
            address: '4 Kwaapaay Ct, El Cajon, CA 92019',
            website: 'https://sycuantribe.com/police-department/',
            native: true,
          },
          {
            category: 'law-enforcement',
            name: 'FBI San Diego Field Office',
            description:
              'Federal law enforcement for San Diego and Imperial counties; takes tips and reports of federal crimes, including cases on tribal land, 24/7.',
            phones: [
              {
                label: 'Main (24/7)',
                number: '(858) 320-1800',
              },
            ],
            address: '10385 Vista Sorrento Pkwy, San Diego, CA 92121',
            website: 'https://www.fbi.gov/contact-us/field-offices/sandiego',
            hours: '24/7',
          },
          {
            category: 'native-health',
            name: 'San Diego American Indian Health Center',
            description:
              'Urban Indian health center in Bankers Hill offering medical, dental, and behavioral health care; after hours, call and press 1 to reach a nurse for advice.',
            phones: [
              {
                label: 'Main (after-hours nurse: press 1)',
                number: '(619) 234-2158',
              },
            ],
            address: '2630 First Ave, San Diego, CA 92103',
            website: 'https://sdaihc.org/',
            native: true,
          },
          {
            category: 'dv-sa',
            name: 'Center for Community Solutions',
            description:
              'Serves all victims of relationship violence and sexual assault in San Diego County with a confidential 24/7 crisis hotline, shelter, counseling, and legal services.',
            phones: [
              {
                label: '24/7 Crisis Hotline',
                number: '1-888-385-4657',
              },
              {
                label: 'Office',
                number: '(858) 272-5777',
              },
            ],
            address: '4508 Mission Bay Dr, San Diego, CA 92109',
            website: 'https://www.ccssd.org/',
            hours: '24/7',
          },
          {
            category: 'legal-advocacy',
            name: 'San Diego County District Attorney - Victim Services',
            description:
              'Free victim advocates who help crime victims with support, court accompaniment, and compensation claims; no citizenship requirement.',
            phones: [
              {
                label: 'Victim assistance',
                number: '(619) 531-4041',
              },
            ],
            address: '330 W Broadway, 7th Floor, San Diego, CA 92101',
            website: 'https://www.sdcda.org/helping/victims/victim-services',
          },
          {
            category: 'crisis-hotlines',
            name: 'San Diego Access & Crisis Line',
            description:
              'County behavioral-health crisis and referral line, part of the 988 network, with counselors available around the clock in 200+ languages.',
            phones: [
              {
                label: '24/7 Crisis Line',
                number: '1-888-724-7240',
              },
            ],
            website: 'https://www.sandiegocounty.gov/content/sdc/hhsa/programs/bhs/ACL.html',
            hours: '24/7',
          },
        ],
      },
      {
        name: 'Riverside',
        slug: 'riverside',
        county: 'Riverside County',
        services: [
          {
            category: 'law-enforcement',
            name: 'Riverside Police Department',
            description:
              'City police for Riverside; call the 24-hour non-emergency dispatch center to report a crime or request an officer. (The Orange Street station closed in May 2026; Magnolia Station is the main public station.)',
            phones: [
              {
                label: '24-hour non-emergency dispatch',
                number: '(951) 354-2007',
              },
              {
                label: 'General information',
                number: '(951) 826-5700',
              },
            ],
            address: '10540 Magnolia Ave, Riverside, CA 92505',
            website: 'https://www.riversideca.gov/rpd/',
            hours: '24/7',
          },
          {
            category: 'law-enforcement',
            name: "Riverside County Sheriff's Office",
            description:
              'County sheriff for Riverside County; dispatch centers are staffed 24 hours a day - use the West-End non-emergency line for the Riverside area or the toll-free county line.',
            phones: [
              {
                label: 'Non-emergency dispatch (West-End)',
                number: '(951) 776-1099',
              },
              {
                label: 'Non-emergency dispatch (toll-free)',
                number: '1-800-950-2444',
              },
              {
                label: 'Executive office',
                number: '(951) 955-2400',
              },
            ],
            address: '4095 Lemon St, Riverside, CA 92501',
            website: 'https://www.riversidesheriff.org/',
            hours: '24/7',
          },
          {
            category: 'law-enforcement',
            name: 'Pechanga Tribal Rangers',
            description:
              'Armed tribal public-safety department serving the Pechanga Reservation near Temecula 24 hours a day, enforcing tribal ordinances and working with local law enforcement.',
            phones: [
              {
                label: 'Ranger Department',
                number: '(951) 770-6196',
              },
            ],
            address: '48245 Pechanga Rd, Temecula, CA 92592',
            website:
              'https://www.pechanga-nsn.gov/index.php/tribal-government/services/tribal-rangers',
            hours: '24/7',
            native: true,
          },
          {
            category: 'law-enforcement',
            name: 'Soboba Department of Public Safety',
            description:
              'Tribal public-safety department for the Soboba Reservation near San Jacinto, with its own dispatch center and an MMIW awareness program.',
            phones: [
              {
                label: 'Dispatch center',
                number: '(951) 654-6168',
              },
              {
                label: 'Dispatch (alternate)',
                number: '(951) 654-5544',
              },
            ],
            address: '23333 Soboba Rd, San Jacinto, CA 92583',
            website: 'https://sdps.soboba-nsn.gov/',
            native: true,
          },
          {
            category: 'law-enforcement',
            name: 'FBI Los Angeles Field Office (serves Riverside County)',
            description:
              'Federal law enforcement covering Riverside County through the Los Angeles field office and local resident agencies; takes tips and reports 24/7.',
            phones: [
              {
                label: 'Main (24/7)',
                number: '(310) 477-6565',
              },
            ],
            address: '11000 Wilshire Blvd, Suite 1700, Los Angeles, CA 90024',
            website: 'https://www.fbi.gov/contact-us/field-offices/losangeles',
            hours: '24/7',
          },
          {
            category: 'native-health',
            name: 'Riverside-San Bernardino County Indian Health - San Manuel Indian Health Clinic',
            description:
              'Headquarters clinic of the largest tribal health program in the region, offering medical, dental, and behavioral health care to Native families; nearest full-service clinic to the city of Riverside.',
            phones: [
              {
                label: 'San Manuel Clinic (Grand Terrace)',
                number: '(909) 864-1097',
              },
            ],
            address: '11980 Mt Vernon Ave, Grand Terrace, CA 92313',
            website: 'https://www.rsbcihi.org/',
            native: true,
          },
          {
            category: 'dv-sa',
            name: 'Alternatives to Domestic Violence (ADV)',
            description:
              "Western Riverside County's domestic violence agency since 1978, with 24-hour crisis lines, emergency shelter, counseling, and outreach.",
            phones: [
              {
                label: '24-hour crisis line (Riverside city area)',
                number: '(951) 683-0829',
              },
              {
                label: '24-hour crisis line (rest of county)',
                number: '1-800-339-7233',
              },
              {
                label: 'Office',
                number: '(951) 425-8900',
              },
            ],
            website: 'https://www.alternativestodomesticviolence.org/',
            hours: '24/7',
          },
          {
            category: 'legal-advocacy',
            name: 'Riverside County District Attorney - Division of Victim Services',
            description:
              'Victim services specialists who support crime victims through the court process and help with victim compensation applications.',
            phones: [
              {
                label: 'Riverside office',
                number: '(951) 955-5450',
              },
              {
                label: 'Toll-free',
                number: '1-866-217-3766',
              },
            ],
            address: '3960 Orange St, Riverside, CA 92501',
            website: 'https://rivcoda.org/victim-services',
          },
        ],
      },
      {
        name: 'San Bernardino',
        slug: 'san-bernardino',
        county: 'San Bernardino County',
        services: [
          {
            category: 'law-enforcement',
            name: 'San Bernardino Police Department',
            description:
              'City police for San Bernardino; the non-emergency line is answered 24 hours a day (station lobby open 9 a.m.-4 p.m.).',
            phones: [
              {
                label: 'Non-emergency (24-hour)',
                number: '(909) 383-5311',
              },
              {
                label: 'Main',
                number: '(909) 384-5742',
              },
            ],
            address: '710 N D St, San Bernardino, CA 92401',
            website: 'https://www.sbcity.org/Police',
            hours: '24/7',
          },
          {
            category: 'law-enforcement',
            name: "San Bernardino County Sheriff's Department",
            description:
              'County sheriff for San Bernardino County; use the Valley non-emergency dispatch line for the San Bernardino area or the Desert line for High Desert communities.',
            phones: [
              {
                label: 'Non-emergency dispatch (Valley)',
                number: '(909) 387-8313',
              },
              {
                label: 'Non-emergency dispatch (Desert)',
                number: '(760) 956-5001',
              },
            ],
            address: '655 E Third St, San Bernardino, CA 92415',
            website: 'https://wp.sbcounty.gov/sheriff/',
          },
          {
            category: 'law-enforcement',
            name: 'FBI Los Angeles Field Office (serves San Bernardino County)',
            description:
              'Federal law enforcement covering San Bernardino County through the Los Angeles field office and local resident agencies; takes tips and reports 24/7.',
            phones: [
              {
                label: 'Main (24/7)',
                number: '(310) 477-6565',
              },
            ],
            address: '11000 Wilshire Blvd, Suite 1700, Los Angeles, CA 90024',
            website: 'https://www.fbi.gov/contact-us/field-offices/losangeles',
            hours: '24/7',
          },
          {
            category: 'native-health',
            name: 'Riverside-San Bernardino County Indian Health - San Manuel Indian Health Clinic',
            description:
              "Headquarters clinic of the region's tribal health program in nearby Grand Terrace, offering medical, dental, and behavioral health care to Native families since 1968.",
            phones: [
              {
                label: 'San Manuel Clinic (Grand Terrace)',
                number: '(909) 864-1097',
              },
            ],
            address: '11980 Mt Vernon Ave, Grand Terrace, CA 92313',
            website: 'https://www.rsbcihi.org/',
            native: true,
          },
          {
            category: 'dv-sa',
            name: 'Option House, Inc.',
            description:
              'San Bernardino domestic violence agency with a 24-hour crisis hotline, emergency shelter, legal advocacy, restraining-order help, and support groups.',
            phones: [
              {
                label: '24-hour crisis hotline',
                number: '(909) 381-3471',
              },
              {
                label: 'Office',
                number: '(909) 383-1602',
              },
            ],
            address: '813 N D St, Suite A, San Bernardino, CA 92401',
            website: 'https://www.optionhouseinc.com/',
            hours: '24/7',
          },
          {
            category: 'legal-advocacy',
            name: 'San Bernardino County District Attorney - Bureau of Victim Services',
            description:
              'Victim advocates who help crime victims with court support, victim rights, and financial assistance; San Bernardino Victim Services Center listed here.',
            phones: [
              {
                label: 'San Bernardino Victim Services Center',
                number: '(909) 382-3846',
              },
            ],
            address: '303 W 3rd St, San Bernardino, CA 92415',
            website: 'https://sbcountyda.org/victim-services/',
          },
        ],
      },
      {
        name: 'Palm Springs & Coachella Valley',
        slug: 'palm-springs-coachella',
        county: 'Riverside County',
        services: [
          {
            category: 'law-enforcement',
            name: 'Palm Springs Police Department',
            description:
              'City police for Palm Springs, including the Agua Caliente Reservation checkerboard within city limits; call the non-emergency line for crimes and incidents that are not emergencies.',
            phones: [
              {
                label: 'Non-emergency',
                number: '(760) 327-1441',
              },
              {
                label: 'General info / police report',
                number: '(760) 323-8116',
              },
            ],
            address: '200 S Civic Dr, Palm Springs, CA 92262',
            website: 'https://www.palmspringsca.gov/government/departments/police',
          },
          {
            category: 'law-enforcement',
            name: "Riverside County Sheriff's Office - Coachella Valley stations",
            description:
              'County sheriff patrol for most Coachella Valley cities and unincorporated areas (including the Torres Martinez area via the Thermal station); dispatch is staffed 24 hours a day.',
            phones: [
              {
                label: 'Palm Desert Station',
                number: '(760) 836-1600',
              },
              {
                label: 'Thermal Station',
                number: '(760) 863-8990',
              },
              {
                label: 'Non-emergency dispatch (toll-free)',
                number: '1-800-950-2444',
              },
            ],
            website: 'https://www.riversidesheriff.org/',
            hours: '24/7',
          },
          {
            category: 'law-enforcement',
            name: 'Morongo Tribal Police Department',
            description:
              'Tribal police for the Morongo Indian Reservation at the west end of the San Gorgonio Pass (Banning), with 24-hour dispatch; a valid photo ID is required to enter the reservation.',
            phones: [
              {
                label: '24-hour dispatch',
                number: '(951) 634-4810',
              },
            ],
            address: '47350 Foothill Rd, Banning, CA 92220',
            website: 'https://morongonation.org/tribal-police/',
            hours: '24/7',
            native: true,
          },
          {
            category: 'law-enforcement',
            name: 'FBI Los Angeles Field Office (serves the Coachella Valley)',
            description:
              'Federal law enforcement covering Riverside County, including the Coachella Valley, through the Los Angeles field office; takes tips and reports 24/7.',
            phones: [
              {
                label: 'Main (24/7)',
                number: '(310) 477-6565',
              },
            ],
            address: '11000 Wilshire Blvd, Suite 1700, Los Angeles, CA 90024',
            website: 'https://www.fbi.gov/contact-us/field-offices/losangeles',
            hours: '24/7',
          },
          {
            category: 'native-health',
            name: 'Riverside-San Bernardino County Indian Health - Torres Martinez Indian Health Clinic',
            description:
              'Tribal health clinic in the eastern Coachella Valley (Thermal) offering medical, dental, and behavioral health services to Native families.',
            phones: [
              {
                label: 'Torres Martinez Clinic',
                number: '(760) 397-4476',
              },
            ],
            address: '66655 Martinez Rd, Thermal, CA 92274',
            website: 'https://www.rsbcihi.org/',
            native: true,
          },
          {
            category: 'dv-sa',
            name: 'Shelter From The Storm',
            description:
              "The Coachella Valley's shelter-based domestic violence provider, with 24-hour crisis lines staffed by advocates (many bilingual), emergency shelter, and safety planning.",
            phones: [
              {
                label: '24-hour crisis line',
                number: '(760) 328-7233',
              },
              {
                label: '24-hour crisis line (toll-free)',
                number: '1-800-775-6055',
              },
              {
                label: 'Office',
                number: '(760) 674-0400',
              },
            ],
            address: '73-550 Alessandro Dr, Suite 103, Palm Desert, CA 92260',
            website: 'https://shelterfromthestorm.com/',
            hours: '24/7',
          },
          {
            category: 'dv-sa',
            name: 'Morongo Victim Services Program',
            description:
              'Free, confidential, culturally sensitive advocacy for victims of domestic violence, sexual assault, and stalking on and around the Morongo Reservation, with an attorney, case manager, and legal advocate on staff.',
            phones: [
              {
                label: '24-hour helpline (DV, SA & stalking)',
                number: '(951) 851-9051',
              },
              {
                label: 'Program office',
                number: '(951) 755-5221',
              },
            ],
            website: 'https://morongonation.org/victim-services-program/',
            hours: '24/7',
            native: true,
          },
          {
            category: 'legal-advocacy',
            name: 'Riverside County District Attorney - Victim Services (Indio office)',
            description:
              'Victim services specialists for the Coachella Valley who support crime victims through the court process and help with compensation applications.',
            phones: [
              {
                label: 'Indio office',
                number: '(760) 863-8408',
              },
              {
                label: 'Toll-free',
                number: '1-866-217-3769',
              },
            ],
            address: '82-995 Highway 111, Suite 101, Indio, CA 92201',
            website: 'https://rivcoda.org/victim-services',
          },
        ],
      },
      {
        name: 'Escondido & North San Diego County',
        slug: 'escondido-north-sd',
        county: 'San Diego County',
        services: [
          {
            category: 'law-enforcement',
            name: 'Escondido Police Department',
            description:
              'City police for Escondido; call the non-emergency line to report crimes that are not in progress or request assistance.',
            phones: [
              {
                label: 'Non-emergency',
                number: '(760) 839-4722',
              },
            ],
            address: '1163 N Centre City Pkwy, Escondido, CA 92026',
            website: 'https://www.escondido.gov/173/About-Us',
          },
          {
            category: 'law-enforcement',
            name: 'San Diego County Sheriff - Valley Center Substation',
            description:
              "Sheriff's substation providing law enforcement for Valley Center, Pauma Valley, Palomar Mountain, and the La Jolla, Pala, Pauma, Rincon, and San Pasqual Indian Reservations.",
            phones: [
              {
                label: 'Business line',
                number: '(760) 751-4400',
              },
              {
                label: '24-hour dispatch (non-emergency)',
                number: '(858) 868-3200',
              },
            ],
            address: '28201 N Lake Wohlford Rd, Valley Center, CA 92082',
            website: 'https://www.sdsheriff.gov/',
          },
          {
            category: 'law-enforcement',
            name: 'Rincon Band of Luiseno Indians - Tribal Law Enforcement',
            description:
              'Tribal law enforcement department for the Rincon Reservation in Valley Center, enforcing tribal ordinances and assisting the community, with security reachable 24 hours a day.',
            phones: [
              {
                label: 'Main',
                number: '(760) 749-1051',
              },
              {
                label: 'Security (24 hours)',
                number: '(760) 297-2611',
              },
            ],
            address: 'One Government Center Ln, Valley Center, CA 92082',
            website: 'https://rincon-nsn.gov/government/government-departments/tribal-law/',
            native: true,
          },
          {
            category: 'law-enforcement',
            name: 'FBI San Diego Field Office (serves North San Diego County)',
            description:
              'Federal law enforcement for all of San Diego County, including North County reservations; takes tips and reports of federal crimes 24/7.',
            phones: [
              {
                label: 'Main (24/7)',
                number: '(858) 320-1800',
              },
            ],
            address: '10385 Vista Sorrento Pkwy, San Diego, CA 92121',
            website: 'https://www.fbi.gov/contact-us/field-offices/sandiego',
            hours: '24/7',
          },
          {
            category: 'native-health',
            name: 'Indian Health Council',
            description:
              'Tribally governed health center on the Rincon Reservation in Valley Center serving North San Diego County tribes with medical, dental, behavioral health, and community wellness services.',
            phones: [
              {
                label: 'Main (Rincon campus)',
                number: '(760) 749-1410',
              },
            ],
            address: '50100 Golsh Rd, Valley Center, CA 92082',
            website: 'https://www.indianhealth.com/',
            native: true,
          },
          {
            category: 'dv-sa',
            name: "Strong Hearted Native Women's Coalition",
            description:
              'Native-led coalition based in Valley Center working against domestic violence, sexual assault, trafficking, and MMIP in California tribal communities; offers victim support, advocacy, and a missing-persons bulletin, and refers to the 24/7 national StrongHearts Native Helpline.',
            phones: [
              {
                label: 'Office (Mon-Fri 8:30 a.m.-4 p.m.)',
                number: '(760) 644-4781',
              },
              {
                label: 'StrongHearts Native Helpline (24/7, call or text)',
                number: '1-844-762-8483',
              },
            ],
            website: 'https://strongheartednativewomen.org/',
            native: true,
          },
          {
            category: 'dv-sa',
            name: 'Community Resource Center',
            description:
              'North San Diego County nonprofit in Encinitas providing domestic violence hotline support, safe housing, and therapeutic services.',
            phones: [
              {
                label: 'Domestic violence hotline',
                number: '1-877-633-1112',
              },
              {
                label: 'Office',
                number: '(760) 753-1156',
              },
            ],
            address: '650 2nd St, Encinitas, CA 92024',
            website: 'https://www.crcncc.org/',
          },
          {
            category: 'legal-advocacy',
            name: 'California Indian Legal Services - Southern Office (Escondido)',
            description:
              'Nonprofit legal aid for Native individuals and tribes across Southern California, including free legal advocacy for Native survivors of domestic violence, sexual assault, and stalking in San Diego, Riverside, and San Bernardino counties.',
            phones: [
              {
                label: 'Escondido office',
                number: '(760) 746-8941',
              },
              {
                label: 'Toll-free',
                number: '1-800-743-8941',
              },
            ],
            address: '609 S Escondido Blvd, Escondido, CA 92025',
            website: 'https://www.calindian.org/southernoffice/',
            native: true,
          },
          {
            category: 'legal-advocacy',
            name: 'San Diego County District Attorney - Victim Services (North County)',
            description:
              'Free victim advocates for North County crime victims, offering support, court accompaniment, and help with compensation claims.',
            phones: [
              {
                label: 'North County office (Vista)',
                number: '(760) 806-4079',
              },
            ],
            address: '325 S Melrose Dr, Suite 5000, Vista, CA 92083',
            website: 'https://www.sdcda.org/helping/victims/victim-services',
          },
        ],
      },
    ],
  },
]
