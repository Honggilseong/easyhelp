import React from 'react';
import {View, Text} from 'react-native';
import {
  VictoryPolarAxis,
  VictoryChart,
  VictoryBar,
  VictoryTheme,
} from 'victory-native';
import colors from '../../Assets/theme/colors';
const UserChart = ({height, width, data}) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: 'black',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <VictoryChart
        polar
        theme={VictoryTheme.material}
        height={height}
        width={width}>
        {['신뢰', '시간약속', '책임감', '친절함', '매너'].map((d, i) => {
          return (
            <VictoryPolarAxis
              tickValues={[28, 28, 28, 28, 28]}
              dependentAxis
              key={i}
              label={d}
              labelPlacement="perpendicular"
              style={{
                tickLabels: {fill: 'none'},
                axisLabel: {fontWeight: 700, fontSize: 15},
              }}
              axisValue={d}
            />
          );
        })}
        <VictoryBar
          data={data}
          style={{
            data: {
              fill: colors.red,
              width: 30,
            },
          }}
        />
      </VictoryChart>
    </View>
  );
};

export default UserChart;
