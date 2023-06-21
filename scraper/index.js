const {connect, disconnect, findAllPeriodicos} = require('./mongo')
const scraper = require('./scraper')

const main = async () => {
	await connect()

	const periodicos = await findAllPeriodicos()
	
	await scraper(periodicos)

	disconnect()
}

main()