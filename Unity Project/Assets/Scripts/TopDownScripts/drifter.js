#pragma strict
public var rescueDriftersController: GameObject;
public var rescueDriftersScript: ObjectiveRescueDrifters;

function Start () {
	rescueDriftersController = gameObject.FindGameObjectWithTag ("ObjectiveRescueDrifters");
	rescueDriftersScript = rescueDriftersController.GetComponent.<ObjectiveRescueDrifters>();
}

function Update () {
	
}
function OnCollisionEnter(other:Collision)
{
	if(other.gameObject.tag == "player")
	{
		rescueDriftersScript.SavedDrifter();
		Destroy (gameObject);
	}
	if(other.gameObject.tag == "mine")
	{
		//drifters saved ++;
		Destroy (other.gameObject);
	}
}
