#pragma strict

public var water: GameObject[];
public var waterNumber: int;
public var distanceToNextMove: float;
public var distanceCoveredSinceLastMove: float;
public var moveDistance: float;

function Update () {
distanceCoveredSinceLastMove += 1 * Time.deltaTime;
//if camera has moved left enough then move the correct water object infront
	if (distanceCoveredSinceLastMove > distanceToNextMove)
	{
		water[waterNumber].transform.position.x += moveDistance;
		distanceCoveredSinceLastMove = 0;
//changes what water obj to use next
		waterNumber ++;
		if (waterNumber >= 2)
			waterNumber = 0;
	}
}
