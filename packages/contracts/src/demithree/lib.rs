#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod demithree {
    use ink::prelude::string::String;
    use ink::prelude::vec::Vec;
    use ink::storage::Mapping;

    #[derive(Clone, Copy, scale::Decode, scale::Encode)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub enum ValdiationRating {
        GOOD,
        NORMAL,
        BAD,
    }

    #[ink(storage)]
    pub struct Demithree {
        //Actors
        owner: AccountId,
        registered_nodes: Vec<AccountId>,
        registered_validator: Vec<AccountId>,
        approved_nodes: Vec<AccountId>,
        approved_validators: Vec<AccountId>,

        //Task Managment
        tasks: Mapping<u32, String>,
        task_count: u32,
        validated_tasks: Mapping<u32, ValdiationRating>,
        validated_tasks_count: u32,

        //Miscellaneous
        is_init: bool,
    }

    impl Demithree {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                owner: AccountId::from([0xFF as u8; 32]),
                tasks: Mapping::new(),
                task_count: 0,
                validated_tasks: Mapping::new(),
                validated_tasks_count: 0,
                is_init: false,
                registered_nodes: Vec::new(),
                registered_validator: Vec::new(),
                approved_nodes: Vec::new(),
                approved_validators: Vec::new(),
            }
        }
        /******/
        /*READ*/
        /******/
        #[ink(message)]
        pub fn get_init(&mut self) -> bool {
            self.is_init
        }
        #[ink(message)]
        pub fn get_owner(&self) -> AccountId {
            self.owner
        }
        #[ink(message)]
        pub fn get_task(&self, index: u32) -> String {
            self.tasks.get(index).unwrap()
        }
        #[ink(message)]
        pub fn get_validated_rating(&mut self, index: u32) -> ValdiationRating {
            self.validated_tasks.get(&index).unwrap()
        }
        #[ink(message)]
        pub fn get_registered_nodes(&self) -> Vec<AccountId> {
            self.registered_nodes.clone()
        }
        #[ink(message)]
        pub fn get_registered_validators(&self) -> Vec<AccountId> {
            self.registered_validator.clone()
        }
        #[ink(message)]
        pub fn get_approved_nodes(&self) -> Vec<AccountId> {
            self.approved_nodes.clone()
        }
        #[ink(message)]
        pub fn get_approved_validators(&self) -> Vec<AccountId> {
            self.approved_validators.clone()
        }

        /*******/
        /*WRITE*/
        /*******/
        #[ink(message)]
        pub fn init(&mut self) {
            if self.owner == AccountId::from([0xFF as u8; 32]) {
                self.owner = self.env().caller();
                self.is_init = true;
            }
        }
        #[ink(message)]
        pub fn change_owner(&mut self, new_owner: AccountId) {
            if self.owner == self.env().caller() {
                self.owner = new_owner
            }
        }
        #[ink(message)]
        pub fn add_task(&mut self, new_task: String) {
            self.tasks.insert(self.task_count, &new_task);
            self.task_count += self.task_count + 1;
        }
        #[ink(message)]
        pub fn validate_task(&mut self, index: u32, rating: ValdiationRating) {
            self.validated_tasks.insert(index, &rating);
            self.validated_tasks_count += 1;
        }
        #[ink(message)]
        pub fn register_node(&mut self) {
            let caller = self.env().caller();
            self.registered_nodes.push(caller)
        }
        #[ink(message)]
        pub fn register_validator(&mut self) {
            let caller = self.env().caller();
            self.registered_validator.push(caller)
        }
        #[ink(message)]
        pub fn unregister_node(&mut self, node: AccountId) {
            self.registered_nodes.retain(|&x| x != node);
        }
        #[ink(message)]
        pub fn unregister_validator(&mut self, validator: AccountId) {
            self.registered_validator.retain(|&x| x != validator);
        }
        #[ink(message)]
        pub fn approve_node(&mut self, node: AccountId) {
            if self.env().caller() != self.owner {
                return;
            }

            let node_clone = node.clone();
            let index = self
                .registered_nodes
                .iter()
                .position(|x| x.clone() == node_clone);
            match index {
                Some(index) => {
                    self.registered_nodes.remove(index);
                    self.approved_nodes.push(node);
                }
                None => {}
            }
        }
        #[ink(message)]
        pub fn approved_validator(&mut self, validator: AccountId) {
            if self.env().caller() != self.owner {
                return;
            }

            let node_clone = validator.clone();
            let index = self
                .registered_validator
                .iter()
                .position(|x| x.clone() == node_clone);
            match index {
                Some(index) => {
                    self.registered_validator.remove(index);
                    self.approved_validators.push(validator);
                }
                None => {}
            }
        }
    }
}
