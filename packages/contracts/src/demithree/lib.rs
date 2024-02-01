#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod demithree {

    #[ink(storage)]
    pub struct Demithree {}

    impl Demithree {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {}
        }
        #[ink(message)]
        pub fn empty_message(&self) {}
    }
}
