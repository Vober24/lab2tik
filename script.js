const input_dx = document.querySelector('[id="Dx"]')
const input_m1 = document.querySelector('[id="m1"]')
const input_fd1 = document.querySelector('[id="fd1"]')
const input_m2 = document.querySelector('[id="m2"]')
const input_fd2 = document.querySelector('[id="fd2"]')
const input_TprAcp = document.querySelector('[id="TprAcp"]')
const btn = document.querySelector(".border-button")

const formula_fd1 = document.querySelector('[class = "formula_fd1 formula"]')
const formula_fd2 = document.querySelector('[class = "formula_fd2 formula"]')
const text_t1pr = document.querySelector('[class = "formula-text text-t1pr"]')
const text_t2pr = document.querySelector('[class = "formula-text text-t2pr"]')
const formula_t1pr = document.querySelector('[class = "formula-t1pr1 formula"]')
const formula_t2pr = document.querySelector('[class = "formula-t2pr2 formula"]')
const formula_real_tpr1 = document.querySelector('[class = "formula-real-tpr1 formula"]')
const formula_real_tpr2 = document.querySelector('[class = "formula-real-tpr2 formula"]')
const text_info_deltaT = document.querySelector('[id="info_text_deltaT"]')


btn.addEventListener("click", function () {
    gen_formulas_fd(input_fd1.value, input_fd2.value, input_dx.value, input_m1.value, input_m2.value)
    gen_formulas_with_acp(input_TprAcp.value, input_m1.value, input_m2.value)
    MathJax.typeset()
})

let search_fd = (fv, dx) =>{
    return(2*fv*10^3*(1+dx/100))
}

let search_tpr = (fd, m)=>{
    return m*((1/fd)*(10^-6)+0.1*(1/fd)*(10^-6))
}

let gen_formulas_fd = (fv1, fv2,dx,m1,m2) => {
    let fd1 = search_fd(fv1,dx)
    let fd2 = search_fd(fv2,dx)
    let t1pr = search_tpr(fd1, input_m1.value)
    let t2pr = search_tpr(fd2, input_m1.value)

    formula_fd1.innerHTML =`\\( {f}_{d1} = 2*${fv1}*10^3(\\frac{${dx}}{100}) =  ${fd1.toFixed(2)}\\)`;
    formula_fd2.innerHTML =`\\( {f}_{d2} = 2*${fv2}*10^3(\\frac{${dx}}{100}) =  ${fd2.toFixed(2)}\\)`
    text_t1pr.innerHTML = `При цьому час перетворення АЦП дорівнює \\({Т}_{пр1}\\) = \\(\\frac{1}{ ${fd1}}\\) = ${(1/fd1).toFixed(2)} мкс.<br> Для вхідних
                            каналів другої групи ППІ:`
    text_t2pr.innerHTML = `При цьому час перетворення АЦП дорівнює \\({Т}_{пр2}\\) = \\(\\frac{1}{ ${fd2}}\\) = ${(1/fd2).toFixed(2)} мкс.`
    formula_t1pr.innerHTML = `\\({T}_{пр1} = ${m1}(${(1/fd1).toFixed(2)}*10^{−6} +0.1*${(1/fd1).toFixed(2)}*10^{-6} = ${t1pr.toFixed(2)} \\) `
    formula_t2pr.innerHTML = `\\({T}_{пр2} = ${m2}(${(1/fd2).toFixed(2)}*10^{−6} +0.1*${(1/fd2).toFixed(2)}*10^{-6} = ${t2pr.toFixed(2)} \\) `
}

let search_real_tpr = (tpr_acp, m)=>{
    let delta_t = tpr_acp * 0.1
    return m*(tpr_acp+delta_t)
}

let gen_formulas_with_acp = (tpr_acp, m1, m2)=>{
    let real_tpr1 = search_real_tpr(tpr_acp,m1)
    let real_tpr2 = search_real_tpr(tpr_acp,m2)

    formula_real_tpr1.innerHTML = `\\({T}_{пр1real} = ${m1}(${tpr_acp}*${(tpr_acp*0.1).toFixed(2)}) = ${real_tpr1.toFixed(2)} \\) мкс.`
    formula_real_tpr2.innerHTML = `\\({T}_{пр2real} = ${m2}(${tpr_acp}*${(tpr_acp*0.1).toFixed(2)}) = ${real_tpr2.toFixed(2)} \\) мкс.`
    text_info_deltaT.innerHTML = `Виходячи з параметрів n і fd вибираємо АЦП. Найбільш придатним для нашого прикладу є перетворювач AD674B, що
                має значення та \\({Т}_{прAцп}\\) = ${tpr_acp} мкс.<br>Враховуючи, що для перетворення сигналу кожного каналу в код необхідно
                виділяти додатковий час
                \\(Δt = 10t\\)
                , що забезпечує перемикання мультиплексора з
                каналу на канал (для мікросхеми мультиплексора будемо вважати, що час
                перемикання дорівнює ${(tpr_acp*0.1).toFixed(2)} мкс – 10% від часу перетворення АЦП)`
}