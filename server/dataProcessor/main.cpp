#include <iostream>
#include <cmath>
#include <stdio.h>
#include <fstream>
#include <string>



int main(int argc, char *argv[]){

	std::ifstream file(argv[1]);

	int mode = std::stoi(argv[2]);
	int dataLength = std::stoi(argv[3]);
	//1-10s
	//2-30min
	//3-1h
	//4-24h
	//5-1week
	//7-1mon
	//8-all


	if(!file.is_open()){
		printf("error occured");
		return 1;
	}else{
		//create a line
		std::string cline;

		int _10s = 20;
		int _1min = 2*60;
		int _30min = _1min * 30;
		int _1h = _30min*2;
		int _24h = _1h*24;
		int _1week = _24h * 7;
		int _1mon = _24h*30;
		int _allTime = -1;
		
		
		int targetValue;
		switch(mode){
			case 1:targetValue = _10s;break;
			case 2:targetValue = _1min;break;
			case 3:targetValue = _30min;break;
			case 4:targetValue = _1h; break;
			case 5:targetValue = _24h;break;
			case 6:targetValue = _1week;break;
			case 7:targetValue = _1mon;break;
			case 8:targetValue = _allTime;break;
			default: return 1;
		}
	
		int index = 0;
		float values[10];
		int chunksize = (int)targetValue/10;
		int intermediateSum;
	
		for(int i =0; std::getline(file,cline) && i != targetValue; i++){
			float line = std::stof(cline);
			if(i % chunksize == 0){
				float average = intermediateSum / chunksize;
				intermediateSum = 0;
				values[index] = average;
				index++;
			}else{
				intermediateSum+=line;
			}
		}
		std::cout << index;

		for(int i = 0; i < 10; i++){
			std::cout << values[i] << std::endl;
		}

		
		file.close();
	}

	return 0;
}




