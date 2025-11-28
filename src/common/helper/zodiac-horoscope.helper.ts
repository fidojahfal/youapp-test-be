type HoroscopeName =
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces';

interface HoroscopeRange {
  name: HoroscopeName;
  start: { month: number; day: number };
  end: { month: number; day: number };
}

const HOROSCOPE_RANGES: HoroscopeRange[] = [
  { name: 'Aries', start: { month: 3, day: 21 }, end: { month: 4, day: 19 } },
  { name: 'Taurus', start: { month: 4, day: 20 }, end: { month: 5, day: 20 } },
  { name: 'Gemini', start: { month: 5, day: 21 }, end: { month: 6, day: 21 } },
  { name: 'Cancer', start: { month: 6, day: 22 }, end: { month: 7, day: 22 } },
  { name: 'Leo', start: { month: 7, day: 23 }, end: { month: 8, day: 22 } },
  { name: 'Virgo', start: { month: 8, day: 23 }, end: { month: 9, day: 22 } },
  { name: 'Libra', start: { month: 9, day: 23 }, end: { month: 10, day: 23 } },
  {
    name: 'Scorpio',
    start: { month: 10, day: 24 },
    end: { month: 11, day: 21 },
  },
  {
    name: 'Sagittarius',
    start: { month: 11, day: 22 },
    end: { month: 12, day: 21 },
  },
  {
    name: 'Capricorn',
    start: { month: 12, day: 22 },
    end: { month: 1, day: 19 },
  },
  {
    name: 'Aquarius',
    start: { month: 1, day: 20 },
    end: { month: 2, day: 18 },
  },
  { name: 'Pisces', start: { month: 2, day: 19 }, end: { month: 3, day: 20 } },
];

const zodiac_signs = [
  'Rat',
  'Ox',
  'Tiger',
  'Rabbit',
  'Dragon',
  'Snake',
  'Horse',
  'Goat',
  'Monkey',
  'Rooster',
  'Dog',
  'Pig',
];

type ZodiacName = (typeof zodiac_signs)[number];

export function getHoroscope(birthdate: string): HoroscopeName {
  const date = new Date(birthdate);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();

  for (const h of HOROSCOPE_RANGES) {
    const { start, end } = h;
    if (
      start.month < end.month ||
      (start.month === end.month && start.day <= end.day)
    ) {
      if (
        (month > start.month || (month === start.month && day >= start.day)) &&
        (month < end.month || (month === end.month && day <= end.day))
      ) {
        return h.name;
      }
    } else {
      if (
        month > start.month ||
        month < end.month ||
        (month === start.month && day >= start.day) ||
        (month === end.month && day <= end.day)
      ) {
        return h.name;
      }
    }
  }

  return 'Aries';
}

export function getZodiac(birthdate: string): ZodiacName {
  const year = new Date(birthdate).getFullYear();
  const baseYear = 2020;
  const index = (((year - baseYear) % 12) + 12) % 12;

  return zodiac_signs[index];
}
