# Testing Workflow

This document describes the Testing Workflow. (alias How to click buttons)

| Step                      | Call                    | Caller     | Description                                        | Check |
| :------------------------ | :---------------------- | :--------- | :------------------------------------------------- | :---- |
| **Initialisation**        | -                       | -          | -                                                  | ❓    |
| 1                         | init                    | FrankAleph | FrankAleph become the owner                        | ❓    |
| **Noderegistration**      | -                       | -          | -                                                  | ❓    |
| 2                         | register_node           | FrankAleph | FrankAleph becomes a registered_node               | ❓    |
| 3                         | get_register_nodes      | FrankAleph | Check if FrankAleph is under registered_nodes      | ❓    |
| 4                         | register_node           | FrankAleph | Add Alice to register_nodes                        | ❓    |
| 5                         | get_register_nodes      | FrankAleph | Check if Alice is under registered_nodes           | ❓    |
| 6                         | unregister_nodes        | FrankAleph | Deletes Alice from register nodes                  | ❓    |
| 7                         | get_register_nodes      | FrankAleph | Check if Alice is not under registered_nodes       | ❓    |
| **Validatorregistration** | -                       | -          | -                                                  | ❓    |
| 8                         | register_validator      | FrankAleph | FrankAleph becomes a registered_validator          | ❓    |
| 9                         | get_register_validators | FrankAleph | Check if FrankAleph is under registered_validators | ❓    |
| 10                        | register_validator      | FrankAleph | Add Alice to registered_validators                 | ❓    |
| 11                        | get_register_validators | FrankAleph | Check if Alice is under registered_validators      | ❓    |
| 12                        | unregister_validators   | FrankAleph | Deletes Alice from registered_validators           | ❓    |
| 13                        | get_register_validators | FrankAleph | Check if Alice is not under registered_validators  | ❓    |
| **Approving**             | -                       | -          | -                                                  | ❓    |
| 14                        | approve_node            | FrankAleph | approve FrankAleph, adds it to approve_nodes       | ❓    |
| 15                        | get_approved_nodes      | FrankAleph | Check if FrankAleph is under approved_nodes        | ❓    |
| 16                        | approve_validator       | FrankAleph | approve FrankAleph, adds it to approve_validator   | ❓    |
| 17                        | get_approved_validators | FrankAleph | Check if FrankAleph is under approved_validators   | ❓    |
| **Tasking**               | -                       | -          | -                                                  | ❓    |
| 18                        | add_task                | FrankAleph | adds a task                                        | ❓    |
| 19                        | get_tasks               | FrankAleph | Check if Task is in tasks                          | ❓    |
| 20                        | add_task                | FrankAleph | adds another task                                  | ❓    |
| 21                        | get_tasks               | FrankAleph | Check if Task is in tasks                          | ❓    |
| 22                        | validate_task           | FrankAleph | Validates first task                               | ❓    |
| 23                        | get_validated_tasks     | FrankAleph | Check if Task is now in validated_tasks            | ❓    |
| 24                        | validate_task           | FrankAleph | Validates second task                              | ❓    |
| 25                        | get_validated_tasks     | FrankAleph | Check if Task is now in validated_tasks            | ❓    |
| **Ownership**             | -                       | -          | -                                                  | ❓    |
| 26                        | change_owner            | FrankAleph | changes owner to Alice                             | ❓    |
| 27                        | get_owner               | FrankAleph | Check if new owner is Alice                        | ❓    |
