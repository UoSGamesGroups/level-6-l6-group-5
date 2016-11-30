#pragma strict
//BOSS GEN CURRENTLY IN THIS ONE BCOZ CBA TO MAKE ANOTHER SCRIPT OR RENAME THIS ONE
public var mine: GameObject;
public var boss: GameObject;
public var numberOfMines: int;


function Start () 
{
	var bossPos: Vector3;
	bossPos.x = Random.Range(0,14);
	bossPos.y = 0.2;
	bossPos.z = Random.Range(0,14);
	Instantiate (boss,bossPos,transform.rotation);
	

	var randPos: Vector3;
	for (var i: int; i < numberOfMines; i ++)
		{
			randPos.y = 0.2;
			randPos.x = Random.Range (-11,15);
			randPos.z = Random.Range (-8,8);
			Instantiate (mine,randPos,transform.rotation);
		}
}
