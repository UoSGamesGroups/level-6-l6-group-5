#pragma strict
public var drifter: GameObject;
public var totalDrifters: int;
public var driftersSaved: int;

function Start () 
{
	var randPos: Vector3;
	for (var i: int; i < totalDrifters; i ++)
		{
			randPos.y = 0.2;
			randPos.x = Random.Range (-11,15);
			randPos.z = Random.Range (-8,8);
			Instantiate (drifter,randPos,transform.rotation);
		}
}
function SavedDrifter()
{
	driftersSaved ++;
	if (driftersSaved == totalDrifters)
	{
		Application.LoadLevel("Boss");
	}
}