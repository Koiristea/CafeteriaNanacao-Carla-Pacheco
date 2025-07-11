import request from "supertest"
import app from "../index.js"

describe("Operaciones CRUD de cafes", () => {
  it("Debería devolver status 200 y un arreglo con al menos 1 objeto al hacer GET /cafes", async () => {
    const response = await request(app).get("/cafes")

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
  })

  it("Debería devolver código 404 al intentar eliminar un café con id que no existe", async () => {
    const idInexistente = 999
    const response = await request(app)
      .delete(`/cafes/${idInexistente}`)
      .set("Authorization", "Bearer token")

    expect(response.status).toBe(404)
  })

  it("Debería agregar un nuevo café y devolver código 201", async () => {
    const nuevoCafe = {
      id: 999,
      nombre: "Café de Prueba",
      descripcion: "Café para testing",
    }

    const response = await request(app).post("/cafes").send(nuevoCafe)

    expect(response.status).toBe(201)
    expect(Array.isArray(response.body)).toBe(true)
  })

  it("Debería devolver status 400 si intentas actualizar un café enviando un id diferente en los parámetros", async () => {
    const idParametro = 1
    const cafeConIdDiferente = {
      id: 2,
      nombre: "Café Actualizado",
      descripcion: "Descripción actualizada",
    }

    const response = await request(app)
      .put(`/cafes/${idParametro}`)
      .send(cafeConIdDiferente)

    expect(response.status).toBe(400)
  })
})
