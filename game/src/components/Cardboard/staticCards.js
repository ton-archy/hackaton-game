export const victoryCard = (value) => {
  return {
    actor: value > 0 ? `Добыто: ${value}` : "",
    line: "ВЫ ВЫИГРАЛИ! Позвольте отряду пировать и подождите следущего дня.",
    img: "victory"
  }
}

export const loseCard = (value) => {
  return {
    actor: value > 0 ? `Добыто: ${value}` : "",
    line: "ВЫ ПРОИГРАЛИ! Позвольте отряду восстановится и подождите следущего дня.",
    img: "lose"
  }
}

export const lastCard = () => {
  return {
    line: "Милорд, вы достигли границы изученного мира. Дождитесь открытия новых путей.",
    img: "lastCard"
  }
}

export const dailyLimitCard = (value) => {
  return {
    actor: value > 0 ? `Добыто: ${value}` : "",
    line: "Милорд, ваш отряд устал! Необходимо разбить лагерь и дождаться следующего дня, чтобы продолжить поход. Ваши сокровища направлены в казну.",
    img: "dailyLimit"
  }
}
