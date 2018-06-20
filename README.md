# Predator and Prey Model

## [WEB APP](http://commoning.rocks/predatorVSpreyGrass/)

The model is based on the following simple rules:

### Prey

* Tries to move in a random direction
* Health increases by eating grass
* When health reaches a threshold:
    * They will reproduce, creating a new "Prey"
    * Their health resets to 1

### Predator

* Tries to move in a random direction
* Health decreases
* When health reaches 0, they die and turn into "Nothing"
* If the adjacent square is a prey: They will eat it, turning it into a "predator" (reproducing) Their health will increase by the amount of health the eaten prey had

### Grass

* The grass fills the whole world
* After being eaten by a prey it grows back at a specific rate

## How it works

The AgentModel class creates a grid of agents, the agets can be: preys, predators or nothing.
Each frame the model is updated. First by updating the health of the agents, than they are moved. The agents can move only in the adiacent free cells, it means either up, down, left and right, Diagonal movement are not allowed. `move(x, y)` moves the agent to a random direction.
Two cases can happen that influence the model. If a prey moves to spot neighbouring a predator it gets eaten and the predator health increases, or a prey can land on spot with grass and in that case it eats it and his health increases.
There are four values to change wth the slider

* The threshold, that is the rate by which the prey reproduce
* The maximum health of every single Agent
* The initial number of empty or cells
* The proportion between predators and preys

The play button restarts the model with the new values.
The infographic on the left side shows how many preys and predator are still alive.

## Reference

[Predator & Prey Model](https://github.com/Hopson97/PredatorAndPrey) by [Matthew Hopson](https://github.com/Hopson97)