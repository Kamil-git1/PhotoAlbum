let l
process.env.NODE_ENV === "production" ? (l = "") : (l = "http://localhost:5000")

export let baseUrl = `${l}`
