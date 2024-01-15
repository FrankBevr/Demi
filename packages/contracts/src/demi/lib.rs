#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod demi {
    #[ink(storage)]
    pub struct Demi {
        validators: AccountId,
        nodes: AccountId,
    }

    impl Demi {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                validators: AccountId::from([0xFF as u8; 32]),
                nodes:  AccountId::from([0xFF as u8; 32]),
            }
        }

        #[ink(message)]
        pub fn add_validator(&mut self) {
            self.validators = self.env().caller();
        }

        #[ink(message)]
        pub fn add_node(&mut self) {
            self.nodes = self.env().caller();
        }

        #[ink(message)]
        pub fn get_validator(&self) -> AccountId {
            self.validators.clone()
        }

        #[ink(message)]
        pub fn get_node(&self) -> AccountId {
            self.nodes.clone()
        }
    }
}
