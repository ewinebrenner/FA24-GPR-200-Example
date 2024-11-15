#version 330 core
out vec4 FragColor;

in vec3 Pos;
in vec2 UV;

uniform float _Time;
void main(){
	//Sky gradient
	vec3 bottomCol = vec3(0.4,0.8,0.9);
	vec3 topCol = vec3(0.1,0.2,0.9);
	vec3 col = mix(bottomCol,topCol,UV.y);
	col.gb*=sin(_Time) * 0.5 + 0.5;
	vec3 sunDir = vec3(0.0,sin(_Time),cos(_Time));
	sunDir = normalize(sunDir);

	vec3 normal = normalize(Pos);
	float sunD = max(dot(sunDir,normal),0);
	sunD = pow(sunD,128);
	vec3 sunCol = vec3(1.0,0.9,0.9) * vec3(sunD);
	col+=sunCol;
	FragColor = vec4(col,1.0);
}