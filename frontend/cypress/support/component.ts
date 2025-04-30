import { createPinia, Pinia, setActivePinia } from "pinia";
import { mount } from 'cypress/vue'
import { DefineComponent, h } from 'vue'

let pinia: Pinia;

// Run this code before each *test*.
beforeEach(() => {
  // New Pinia
  pinia = createPinia();

  // Set current Pinia instance
  setActivePinia(pinia);


});


function mountWithPinia(
  Comp: DefineComponent,
  options?: Parameters<typeof mount>[1]
): Cypress.Chainable {
  return mount(Comp, {
    ...options,
    global: {
      ...options?.global,
      plugins: [...(options?.global?.plugins ?? []), pinia],
    },
  });
}

declare global {
  namespace Cypress {
    interface Chainable {
      mountWithPinia: typeof mountWithPinia;
    }
  }
}

Cypress.Commands.add("mountWithPinia", mountWithPinia);
