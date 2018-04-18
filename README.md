# Predator and Prey Model

## [WEB APP](http://commoning.rocks/predatorVSpreyGrass/)

The model is based on the following simple rules:

### Prey

* Tries to move in a random direction.
* Health increases.
* When health reaches a threshold:
    * They will reproduce, creating a new "Prey"
    * Their health resets to 1

### Predator

* Tries to move in a random direction.
* Health decreases.
* When health reaches 0, they die and turn into "Nothing".
* If the adjacent square is a prey: They will eat it, turning it into a "predator" (reproducing) Their health will increase by the amount of health the eaten prey had

## How it works

The AgentModel class creates a grid of agents, the agets can be: preys, predators or nothing.
Each frame the model is updated. First by updating the health of the agents, than they are moved. The agents can move only in the adiacent free cells, it means either up, down, left and right, Diagonal movement are not allowed. `move(x, y)` tries to move the agent to a random direction.
Once the agent is moved the agent checks wheter the neighbour was a predator in that case the prey is eaten and the predator reproduces getting the health of the eaten prey.
There are four values to change wth the slider

* The threshold, that is the rate by which the prey reproduce
* The maximum health of every single Agent
* The initial number of empty or cells
* The proportion between predators and preys

The play button restarts the model with the new values.
The infographic on the left side shows how many preys and predator are still alive.

## Reference

[Predator & Prey Model](https://github.com/Hopson97/PredatorAndPrey) by [Matthew Hopson](https://github.com/Hopson97)