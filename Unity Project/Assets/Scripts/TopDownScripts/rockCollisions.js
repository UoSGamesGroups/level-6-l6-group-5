#pragma strict
public var explosion: GameObject;

function OnCollisionEnter (other: Collision)
{
	if(other.gameObject.tag == "player")
	{
		other.gameObject.GetComponent.<ExploreControls>().speed = 0;
		Instantiate(explosion,other.gameObject.transform.position, transform.rotation);
	}
}