const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/calcular-kpis', (req, res) => {
  const { total_produzido, defeitos, retrabalho } = req.body

  if (total_produzido <= 0) {
    return res.status(400).json({ erro: 'Total produzido inválido' })
  }

  const taxaDefeitos = (defeitos / total_produzido) * 100
  const taxaRetrabalho = (retrabalho / total_produzido) * 100
  const conformidade = ((total_produzido - defeitos - retrabalho) / total_produzido) * 100

  const alerta =
    taxaDefeitos > 3 ||
    taxaRetrabalho > 2 ||
    conformidade < 95

  res.json({
    taxa_defeitos: taxaDefeitos.toFixed(2),
    taxa_retrabalho: taxaRetrabalho.toFixed(2),
    conformidade: conformidade.toFixed(2),
    alerta
  })
})

app.listen(3000, () => {
  console.log('API de KPIs rodando na porta 3000')
})
