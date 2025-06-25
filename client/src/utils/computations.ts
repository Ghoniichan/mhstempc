export interface LoanComputations {
  amountLoan: number;
  interestRate: number;
  interest: number;
  paidUpCapital: number;
  savings: number;
  serviceFee: number;
  netAmount: number;
}

const termToMonths = (term: string): number => {
  const map: Record<string, number> = {
    oneMonth:     1,
    twoMonths:    2,
    threeMonths:  3,
    fourMonths:   4,
    fiveMonths:   5,
    sixMonths:    6,
    sevenMonths:  7,
    eightMonths:  8,
    nineMonths:   9,
    tenMonths:   10,
    elevenMonths:11,
    twelveMonths:12,
  };
  const months = map[term];
  if (months == null) {
    throw new Error(`Unrecognized payment term: "${term}"`);
  }
  return months;
};

const getInterestRate = (termKey: string): number => {
  const m = termToMonths(termKey);
  if (m >= 1 && m <= 3)  return 0.02;
  if (m >= 4 && m <= 6)  return 0.03;
  if (m >= 7 && m <= 12) return 0.05;
  throw new Error(`No interest rate defined for ${m} months`);
};

const getServiceFee = (loan: number): number => {
  if (loan >= 3000 && loan <= 5000)   return 100;
  if (loan > 5000 && loan <= 10000)   return 150;
  if (loan > 10000 && loan <= 15000)  return 200;
  if (loan > 15000 && loan <= 20000)  return 250;
  if (loan > 20000 && loan <= 25000)  return 300;
  if (loan > 25000 && loan <= 30000)  return 400;
  return 0;
};

/**
 * Compute all loan breakdown numbers.
 */
export default function computeLoanDetails(
  amountLoan: number,
  paymentTerms: string
): LoanComputations {
  const interestRate  = getInterestRate(paymentTerms);
  const interest      = amountLoan * interestRate;
  const paidUpTotal   = amountLoan * 0.02; // fixed 2% paid‐up
  const paidUpCapital = Math.floor(paidUpTotal / 50) * 50;
  const savings       = paidUpTotal - paidUpCapital;
  const serviceFee    = getServiceFee(amountLoan);
  const netAmount     = amountLoan - serviceFee - interest;

  return {
    amountLoan,
    interestRate,
    interest,
    paidUpCapital,
    savings,
    serviceFee,
    netAmount,
  };
}
