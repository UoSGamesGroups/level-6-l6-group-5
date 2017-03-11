#pragma strict
public var powerId: int;
public var chanceToShow: int;

function Start ()
{
	powerId = Random.Range (0,4);
	var chanceRolled = Random.Range (0,100);
	if(chanceRolled < chanceToShow)
	{
		gameObject.SetActive(false);
	}
}