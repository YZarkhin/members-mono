import { describe, expect, it } from "vitest";
import { profileSchema } from "./member";

describe("profileSchema", () => {
  describe("fullName", () => {
    it("accepts a valid name", () => {
      const result = profileSchema.safeParse({
        fullName: "Jane Doe",
        role: "member",
        dateOfBirthday: "",
      });
      expect(result.success).toBe(true);
    });

    it("rejects a name shorter than 3 characters", () => {
      const result = profileSchema.safeParse({
        fullName: "Jo",
        role: "member",
        dateOfBirthday: "",
      });
      expect(result.success).toBe(false);
    });

    it("rejects a name longer than 50 characters", () => {
      const result = profileSchema.safeParse({
        fullName: "A".repeat(51),
        role: "member",
        dateOfBirthday: "",
      });
      expect(result.success).toBe(false);
    });

    it("trims whitespace before validating length", () => {
      const result = profileSchema.safeParse({
        fullName: "  Jo  ",
        role: "member",
        dateOfBirthday: "",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("role", () => {
    it("accepts 'member'", () => {
      const result = profileSchema.safeParse({
        fullName: "Jane Doe",
        role: "member",
        dateOfBirthday: "",
      });
      expect(result.success).toBe(true);
    });

    it("accepts 'staff'", () => {
      const result = profileSchema.safeParse({
        fullName: "Jane Doe",
        role: "staff",
        dateOfBirthday: "",
      });
      expect(result.success).toBe(true);
    });

    it("rejects an unknown role", () => {
      const result = profileSchema.safeParse({
        fullName: "Jane Doe",
        role: "admin",
        dateOfBirthday: "",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("dateOfBirthday", () => {
    it("accepts an empty string", () => {
      const result = profileSchema.safeParse({
        fullName: "Jane Doe",
        role: "member",
        dateOfBirthday: "",
      });
      expect(result.success).toBe(true);
    });

    it("accepts a valid ISO date", () => {
      const result = profileSchema.safeParse({
        fullName: "Jane Doe",
        role: "member",
        dateOfBirthday: "1990-06-15",
      });
      expect(result.success).toBe(true);
    });

    it("rejects a non-date string", () => {
      const result = profileSchema.safeParse({
        fullName: "Jane Doe",
        role: "member",
        dateOfBirthday: "not-a-date",
      });
      expect(result.success).toBe(false);
    });
  });
});
