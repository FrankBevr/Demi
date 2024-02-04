# Testing Workflow

This document describes the Testing Workflow. (alias How to click buttons)

| Step                      | Call                    | Caller     | Description                                        | Check              |
| :------------------------ | :---------------------- | :--------- | :------------------------------------------------- | :----------------- |
| **Initialisation**        | -                       | -          | -                                                  | -                  |
| 1                         | init                    | FrankAleph | FrankAleph become the owner                        | :white_check_mark: |
| **Noderegistration**      | -                       | -          | -                                                  | -                  |
| 2                         | register_node           | FrankAleph | FrankAleph becomes a registered_node               | :white_check_mark: |
| 3                         | get_register_nodes      | FrankAleph | Check if FrankAleph is under registered_nodes      | :white_check_mark: |
| 4                         | register_node           | FrankAleph | Add Alice to register_nodes                        | :white_check_mark: |
| 5                         | get_register_nodes      | FrankAleph | Check if Alice is under registered_nodes           | :white_check_mark: |
| 6                         | unregister_nodes        | FrankAleph | Deletes Alice from register nodes                  | :no_good:          |
| 7                         | get_register_nodes      | FrankAleph | Check if Alice is not under registered_nodes       | :no_good:          |
| **Validatorregistration** | -                       | -          | -                                                  | -                  |
| 8                         | register_validator      | FrankAleph | FrankAleph becomes a registered_validator          | :no_good:          |
| 9                         | get_register_validators | FrankAleph | Check if FrankAleph is under registered_validators | :no_good:          |
| 10                        | register_validator      | FrankAleph | Add Alice to registered_validators                 | :no_good:          |
| 11                        | get_register_validators | FrankAleph | Check if Alice is under registered_validators      | :no_good:          |
| 12                        | unregister_validators   | FrankAleph | Deletes Alice from registered_validators           | :no_good:          |
| 13                        | get_register_validators | FrankAleph | Check if Alice is not under registered_validators  | :no_good:          |
| **Approving**             | -                       | -          | -                                                  | -                  |
| 14                        | approve_node            | FrankAleph | approve FrankAleph, adds it to approve_nodes       | :no_good:          |
| 15                        | get_approved_nodes      | FrankAleph | Check if FrankAleph is under approved_nodes        | :no_good:          |
| 16                        | approve_validator       | FrankAleph | approve FrankAleph, adds it to approve_validator   | :no_good:          |
| 17                        | get_approved_validators | FrankAleph | Check if FrankAleph is under approved_validators   | :no_good:          |
| **Tasking**               | -                       | -          | -                                                  | -                  |
| 18                        | add_task                | FrankAleph | adds a task                                        | :white_check_mark: |
| 19                        | get_tasks               | FrankAleph | Check if Task is in tasks                          | :white_check_mark: |
| 20                        | add_task                | FrankAleph | adds another task                                  | :white_check_mark: |
| 21                        | get_tasks               | FrankAleph | Check if Task is in tasks                          | :white_check_mark: |
| 22                        | validate_task           | FrankAleph | Validates first task                               | :no_good:          |
| 23                        | get_validated_tasks     | FrankAleph | Check if Task is now in validated_tasks            | :no_good:          |
| 24                        | validate_task           | FrankAleph | Validates second task                              | :no_good:          |
| 25                        | get_validated_tasks     | FrankAleph | Check if Task is now in validated_tasks            | :no_good:          |
| **Ownership**             | -                       | -          | -                                                  | -                  |
| 26                        | change_owner            | FrankAleph | changes owner to Alice                             | :white_check_mark: |
| 27                        | get_owner               | FrankAleph | Check if new owner is Alice                        | :white_check_mark: |


### Test A

- something with register node is wrong, it passes sometimes the false value i assume
- unregister is weird, it could be because of the retain function in ink, but i don't think so, seems more ui related
- the `--debug-on` doesn't work. I have to run `bash build-all.sh --debug-on`. Seems npm doesnt pick it up.
- approve node doesnt work
- validate task has the false input i guess
- Counter Getter doesn't work either
- yeah, damit ^^'
