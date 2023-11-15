type RepaymentType = "等额本息" | "等额本金";

// 计算几何均值
function calculateGeometricMean(returns: number[]) {
  // 确保数组不为空
  if (returns.length === 0) {
    return undefined;
  }

  // 将收益率转换为增长率
  const growthRates = returns.map((returnRate) => 1 + returnRate / 100);

  // 计算几何均值
  const product = growthRates.reduce((acc, rate) => acc * rate, 1);
  const geometricMean = Math.pow(product, 1 / returns.length) - 1;

  return geometricMean * 100; // 将结果转为百分比形式
}

// 定投指数计算方式
function calculateInvestmentReturns(
  years: number,
  annualRate: number,
  monthlyInvestment: number,
) {
  // 确保参数合法性
  if (years <= 0 || annualRate <= 0 || monthlyInvestment <= 0) {
    throw new Error("参数必须为正数。");
  }

  // 将年化收益率转换为每期增长率
  const monthlyRate = (1 + annualRate / 100) ** (1 / 12) - 1;

  let principal = 0;
  let returns = [];

  for (let year = 1; year <= years; year++) {
    for (let month = 1; month <= 12; month++) {
      // 计算每月结束时的本金
      principal = (principal + monthlyInvestment) * (1 + monthlyRate);
    }

    // 将结果保存到数组
    returns.push({
      year,
      principal: principal.toFixed(2),
      returns: (principal - monthlyInvestment * 12 * year).toFixed(2),
    });
  }
  return returns;
}

// 房贷计算器
function calculateMortgage(
  principal: number,
  loanTerm: number,
  annualRate: number,
  repaymentType: RepaymentType,
) {
  // 确保参数合法性
  if (principal <= 0 || loanTerm <= 0 || annualRate <= 0) {
    throw new Error("参数必须为正数。");
  }

  // 将年化利率转换为月利率
  const monthlyRate = annualRate / 100 / 12;

  if (repaymentType === "等额本息") {
    // 等额本息
    const totalPayments = loanTerm * 12;
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    const totalInterest = totalPayments * monthlyPayment - principal;
    return {
      firstMonthPayment: monthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    };
  } else if (repaymentType === "等额本金") {
    // 等额本金
    const totalPayments = loanTerm * 12;
    const monthlyPrincipalPayment = principal / totalPayments;
    let totalInterest = 0;
    const firstMonthPayment = monthlyPrincipalPayment + principal * monthlyRate;
    for (let i = 1; i <= totalPayments; i++) {
      const monthlyInterest = principal * monthlyRate;
      totalInterest += monthlyInterest;
      principal -= monthlyPrincipalPayment;
    }
    return {
      firstMonthPayment: firstMonthPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    };
  } else {
    throw new Error("无效的还款方式。");
  }
}
