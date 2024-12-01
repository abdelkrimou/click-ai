describe("template spec", () => {
  // beforeEach("Go to website", () => {
  //   cy.visit("https://click-ai.vercel.app");
  // });
  it("test dark mode", () => {
    cy.visit("https://click-ai.vercel.app");

    cy.get("html").should("not.have.class", "dark");
    cy.get(
      'button[class="p-3 sm:order-3 order-2 bg-gray-200 dark:border-white border-black border dark:text-white dark:bg-gray-500 rounded-md"]'
    ).click();
    cy.get("html").should("have.class", "dark");
  });

  it("test create button and Homepage button", () => {
    cy.visit("https://click-ai.vercel.app");

    cy.get('a[href="/create-post"]').click();
    cy.url().should("eq", "https://click-ai.vercel.app/create-post");
    cy.get('a[href="/"] div').click();
    cy.url().should("eq", "https://click-ai.vercel.app/");
  });

  it("generate an image and share with community", () => {
    cy.visit("https://click-ai.vercel.app");

    cy.intercept(
      "POST",
      "https://click-ai.onrender.com/api/v1/stability/generate-image"
    ).as("imageRequest");
    cy.intercept("POST", "https://click-ai.onrender.com/api/v1/post").as(
      "postImage"
    );

    cy.get('a[href="/create-post"]').click();
    cy.get('input[id="prompt"]').should("have.value", "");
    cy.get(".relative").children().first().should("not.be", "img");

    cy.get('button[type="button"]')
      .contains(/surprise me/i)
      .click();
    cy.get('input[id="prompt"]').invoke("val").should("not.be.empty");
    cy.get("button[type='button']")
      .contains(/generate/i)
      .click();
    cy.wait("@imageRequest");
    cy.get(".relative")
      .children()
      .first()
      .should("have.prop", "tagName", "IMG");
    cy.get("#name").invoke("val").should("be.empty");
    cy.get('button[type="submit"]').click();
    cy.get("#name").should("have.focus").type("tester name");
    cy.get('button[type="submit"]').click();
    cy.wait("@postImage").should("exist");
    cy.url().should("eq", "https://click-ai.vercel.app/");
  });
});
