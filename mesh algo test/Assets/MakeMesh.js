#pragma strict

public var width: float;
public var depth: float;

function Start() {	
	var mf: MeshFilter = GetComponent(MeshFilter);
	var mesh = new Mesh();
	mf.mesh = mesh;
	var widthDepth: int = width*depth;


	//Make Vert points
	var vertices: Vector3[] = new Vector3[widthDepth];
	var vert:int;
	for(var d: int = 0; d < (depth); d++)
	{
	for(var w: int = 0; w < (width); w++)
	{
		vertices[vert] = new Vector3(w, 0, d);
		Debug.Log(vert + " = " + vertices[vert]);
		vert++;
	}
	w = 0;
	}

	mesh.vertices = vertices;




	//Make Tris
	var triPoints = (widthDepth)*2 * 3; //width * depth = number of squares * 2 for how many tris * 3 for how many points
	Debug.Log("triPoints = " + triPoints);
	var tri: int[] = new int[triPoints]; // set tri array to the tri point amount

	var r: int; //stores the point in the grid that the loop is up to
	var widthCounter: int =1; //changes numbers when width reached
	var squaresToMake: int = (width-1)*(depth-1); //cant get this to be dynamic
	Debug.Log(squaresToMake);
	for(var t: int = 0; t < squaresToMake*6; t+=6)
	{
	if (widthCounter == width){
	  r += 1;
	  widthCounter = 1;
	}
		tri[t] = r;       	Debug.Log("tri1 "+ tri[t]);
		tri[t+1] = r + 10;	Debug.Log("tri2 "+ tri[t+1]);
		tri[t+2] = r + 11;	Debug.Log("tri3 "+ tri[t+2]);
		tri[t+3] = r;     	Debug.Log("tri4 "+ tri[t+3]);
		tri[t+4] = r + 11;	Debug.Log("tri5 "+ tri[t+4]);
		tri[t+5] = r + 1; 	Debug.Log("tri6 "+ tri[t+5]);
		r++;
		widthCounter++;
	}

	

	/* This is what the tris have to be numbered like
	//square1
	tri[0] = 0;
	tri[1] = 10;
	tri[2] = 11;

	tri[3] = 0;
	tri[4] = 11;
	tri[5] = 1;
	//square2
	tri[6] = 1;
	tri[7] = 11;
	tri[8] = 12;

	tri[9] = 1;
	tri[10] = 12;
	tri[11] = 2;
	//square3
	tri[12] = 2;
	tri[13] = 12;
	tri[14] = 13;

	tri[15] = 2;
	tri[16] = 13;
	tri[17] = 3;
	//square4
	tri[18] = 3;
	tri[19] = 13;
	tri[20] = 14;

	tri[21] = 3;
	tri[22] = 14;
	tri[23] = 4;
	//square5
	tri[24] = 4;
	tri[25] = 14;
	tri[26] = 15;

	tri[27] = 4;
	tri[28] = 15;
	tri[29] = 5;
	//square6
	tri[30] = 5;
	tri[31] = 15;
	tri[32] = 16;

	tri[33] = 5;
	tri[34] = 16;
	tri[35] = 6;
	//square7
	tri[36] = 6;
	tri[37] = 16;
	tri[38] = 17;

	tri[39] = 6;
	tri[40] = 17;
	tri[41] = 7;
	//square8
	tri[42] = 7;
	tri[43] = 17;
	tri[44] = 18;

	tri[45] = 7;
	tri[46] = 18;
	tri[47] = 8;
	//square9
	tri[48] = 8;
	tri[49] = 18;
	tri[50] = 19;

	tri[51] = 8;
	tri[52] = 19;
	tri[53] = 9;
	//square10
	tri[54] = 10;
	tri[55] = 20;
	tri[56] = 21;

	tri[57] = 10;
	tri[58] = 21;
	tri[59] = 11;
	
	
	*/


	mesh.triangles = tri;
	Debug.Log("Tris assigned");



	/* Wave Height
	for(var vertPoint: Vector3 in vertices)
	{
		var waveHeight: float = Random.Range(-1f,1f); 
		vertPoint.y += waveHeight;
	Debug.Log("vert changed");
	}
	mesh.vertices = vertices;
	*/



	var normals: Vector3[] = new Vector3[widthDepth];
	for(var n: int = 0; n < widthDepth; n++)
	{
	normals[n] = -Vector3.down;
	}
	mesh.normals = normals;
}
