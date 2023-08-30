import { getMonth } from "./index"

/**
 *
 */

// Test que le mois est bien retourné après conversion de la string en date
describe("Date helper", () => {
  describe("When getMonth is called", () => {
    it("the function return janvier for 2022-01-01 as date", () => {
      const date = new Date("2022-01-01")
      expect(getMonth(date)).toBe("janvier")
    })
    it("the function return juillet for 2022-07-08 as date", () => {
      const otherDate = new Date("2022-07-08")
      expect(getMonth(otherDate)).toBe("juillet")
    })
  })
})
